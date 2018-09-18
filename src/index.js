import express from 'express';
import bodyParser from 'body-parser';
import routes from './route';
import { logger, morgan } from './utils/logger';

const app = express();
app.disable('x-powered-by');
const port = process.env.PORT;
// eslint-disable-next-line
const addRawBody = (req, res, buf, encoding) => {
  req.rawBody = buf.toString();
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  bodyParser.json({
    verify: addRawBody,
  })(req, res, (err) => {
    if (err) {
      logger.error(err);
      res.status(400);
      res.json({
        error: 'Invalid JSON',
      });
      return;
    }
    next();
  });
});
app.use(morgan);
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, x-access-token');

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.set('secret', '1eed4c1b6e48e730c53075a1c4cddec6');
app.set('logger', logger);
app.set('router', express.Router());
// app.set('db', db);

app.listen(port);

routes(app);

// app.get('logger').info(paygateConf);
app.get('logger').info(`Server started on port http://localhost:${ port }`);
