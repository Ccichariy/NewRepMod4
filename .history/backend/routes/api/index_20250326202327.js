//Import express and create router
const router = require('express').Router();
//2. Import route modules:
//- sessionRouter
const sessionRouter = require('./session.js');

//- usersRouter
const usersRouter = require('./users.js');

//- spotsRouter
const spotsRouter = require('./spots');

//3. Import restoreUser middleware
const { restoreUser } = require("../../utils/auth.js");
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth.js');

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.get('/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({
    where: {
      username: 'Demo-lition'
    }
  });
  setTokenCookie(res, user);
  return res.json({ user: user });
});

router.get(
  '/restore-user',
  (req, res) => {
    return res.json(req.user);
  }
);

router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
