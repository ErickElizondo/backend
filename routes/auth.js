const express = require('express');
const router = express.Router();

const {register, login, forgotpassword, resetpassword } = require('../controllers/auth');

router.route("/register").put(register);

router.route("/login").put(login);

router.route("/forgotpassword").put(forgotpassword);

router.route("/resetpassword/:resetToken").put(resetpassword);

router.post("*", login, async ctx => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
  });

module.exports = router;