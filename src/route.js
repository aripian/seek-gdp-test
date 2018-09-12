import main from './main';
import report from './report';

const routes = (app) => {
  const router = app.get('router');

  router.post('/insert-info', (req, res) => {
    const data = req.body;

    main.insertInfoData(data, (cb) => {
      res.send(cb.res);
    });
  });

  router.get('/report', (req, res) => {
    report.genReport();
    res.send({
      email: 'sent',
    });
  });

  app.use('/api', router);
};

module.exports = routes;
