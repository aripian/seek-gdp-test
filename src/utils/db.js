import { Pool } from 'pg';
import config from '../../config/connections';
import { logger } from './logger';

const pool = new Pool(config);
const query = (text, params, callback) => pool.query(text, params, (err, res) => {
  const start = Date.now();
  const duration = Date.now() - start;
  if (err) {
    logger.error(err);
  }

  logger.info('executed query', { text, duration, rows: res.rowCount });
  callback(err, res);
});

const getClient = (callback) => {
  pool.connect((err, client, done) => {
    const query = client.query.bind(client); // eslint-disable-line

    // monkey patch the query method to keep track of the last query executed
    client.query = () => { // eslint-disable-line
      client.lastQuery = arguments // eslint-disable-line
      // client.query.apply(client, arguments)
      client.query(...arguments);
    };

    // set a timeout of 5 seconds, after which we will log this client's last query
    const timeout = setTimeout(() => {
      logger.error('A client has been checked out for more than 5 seconds!');
      logger.error(`The last executed query on this client was: ${ client.lastQuery }`);
    }, 5000);

    const release = (err) => { // eslint-disable-line
      // call the actual 'done' method, returning this client to the pool
      done(err);

      // clear our timeout
      clearTimeout(timeout);

      // set the query method back to its old un-monkey-patched version
      client.query = query; // eslint-disable-line
    };

    callback(err, client, done);
  });
};

const getPClient = () => pool.connect();

export default { query, getClient, getPClient };
