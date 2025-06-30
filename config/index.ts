import pkg from '@/package.json' with { type: 'json' };
import crypto from 'crypto';

let scheme = 'https';
const externalHostname = process.env.EXTERNAL_HOSTNAME || 'localhost';
const externalPort = parseInt(`${process.env.EXTERNAL_PORT}`) || 3000;
const serviceName = process.env.SERVICE_NAME || pkg.name;

let swaggerHost = externalHostname;
if (externalPort !== 443) {
  swaggerHost = `${swaggerHost}:${externalPort}`;
  scheme = 'http';
}

export const config = {
  cookie: {
    secret: `${process.env.COOKIE_SECRET?.trim() || crypto.randomBytes(32).toString('base64')}`,
  },
  external: {
    scheme,
    hostname: externalHostname,
    port: externalPort,
  },
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  mongo: {
    uri: process.env.DB_CONN_STRING?.trim() || `mongodb://localhost:27017/${pkg.name}`,
    options: {
      socketTimeoutMS: 0,
    },
  },
  swagger: {
    grouping: 'tags',
    host: swaggerHost,
    info: {
      title: `${serviceName} Documentation`,
      version: pkg.version,
    },
    schemes: [scheme],
    jsonPath: '/api/swagger.json',
    documentationPath: '/api/documentation',
    swaggerUIPath: '/api/swaggerui',
  },
};