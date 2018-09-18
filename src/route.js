import main from './main';
import report from './report';

const routes = (app) => {
  const router = app.get('router');

  router.post('/calculate-add', (req, res) => {
    const data = req.body;

    main.calculateDiscounts(data, (cb) => {
      res.send(cb.res);
    });
  });

  app.use('/api', router);
};

module.exports = routes;
