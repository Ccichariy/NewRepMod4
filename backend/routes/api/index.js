const router = require('express').Router();
<<<<<<< HEAD
const { restoreUser } = require('../../utils/auth.js');

router.use(restoreUser);
=======
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const { restoreUser } = require("../../utils/auth.js");
router.use(restoreUser);

router.use('/session', sessionRouter);
>>>>>>> dev

router.use('/users', usersRouter);

<<<<<<< HEAD
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
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

const { requireAuth } = require('../../utils/auth.js');
router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);
=======
router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});
>>>>>>> dev

module.exports = router;
