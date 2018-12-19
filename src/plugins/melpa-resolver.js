const Joi = require('joi');
const findReachableUrls = require('find-reachable-urls');
const got = require('got');
const cache = require('../utils/cache');
const insight = require('../utils/insight');

let lastModified;
let archive;

const resolveUrl = async (pkg) => {
  const cacheKey = `melpa_${pkg}`;

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  const response = await got('https://melpa.org/archive.json', {
    json: true,
    headers: lastModified ? {
      'if-modified-since': lastModified,
    } : undefined,
  });

  if (response.statusCode === 200) {
    lastModified = response.headers['last-modified'];
    archive = response.body;
  }

  const reachableUrl = await findReachableUrls([
    archive[pkg].props.url,
    `https://melpa.org/#/${pkg}`,
  ], { firstMatch: true });

  if (!reachableUrl) {
    throw new Error('No url is reachable');
  }

  cache.set(cacheKey, reachableUrl);

  return reachableUrl;
};

const register = (server) => {
  server.route([{
    path: '/q/melpa/{package*}',
    method: 'GET',
    config: {
      validate: {
        params: {
          package: Joi.required(),
        },
      },
      handler: async (request) => {
        const pkg = request.params.package;

        const eventData = {
          registry: 'melpa',
          resourceId: `melpa:::${pkg}`,
          package: pkg,
          referer: request.headers.referer,
        };

        try {
          const url = await resolveUrl(pkg);

          eventData.url = url;
          insight.trackEvent('resolved', eventData, request);

          return {
            url,
          };
        } catch (err) {
          const eventKey = (err.data || {}).eventKey;
          insight.trackError(eventKey, err, eventData, request);
          return err;
        }
      },
    },
  }]);
};

exports.plugin = {
  name: 'MELPA Resolver',
  version: '1.0.0',
  register,
};
