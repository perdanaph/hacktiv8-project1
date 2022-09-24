const router = require("express").Router();
const usersRouter = require('./usersRouter.js');
const reflectionsRouter = require('./reflectionsRouter.js');
const userVerify = require('../middlewares/authMiddleware.js')

router.use('/api/v1/users',usersRouter);
router.use(userVerify);
router.use('/api/v1/reflections',reflectionsRouter);

module.exports = router;