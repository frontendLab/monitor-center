const Koa = require('koa');
const render = require('./lib/render');
const logger = require('koa-logger');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
// const cors = require('@koa/cors');
const log = require('./lib/log');
const db = require('./lib/db/index');
const util = require('./lib/util');
const mail = require('./lib/mail');
const apiMonitor = require('./collection/apiMonitor/index');
const app = new Koa();
const kcors = require('kcors')

// middleware
app.use(kcors({
  credentials: true
}));
app.use(logger());
app.use(render);
app.use(bodyParser());

// route definitions
// api_monitor api监控
function collectRequest(ctx) {
  try {
    const type = ctx.query.monitorType
    switch (type) {
      case 'apiMonitor':
        apiMonitor.request(ctx)
      case 'errorMonitor':
        apiMonitor.request(ctx)
      default:
        apiMonitor.request(ctx)
    }
  } catch (e) {
    ctx.body = e.stack
  }
}
router.get('/mc', collectRequest)
  .post('/mc', collectRequest)

router.get('/', async ctx => {
  ctx.body = '前端监控中心'
})

app.use(router.routes());

if (!module.parent) {
  app.listen(8001)
  log('[serverstart]')
}

// 
// router.get('/abc', list)
//   .get('/post/new', add)
//   .get('/post/:id', show)
//   .post('/post', create);

// /**
//  * Post listing.
//  */

// async function list(ctx) {
//   await ctx.render('list', { posts: posts });
// }

// /**
//  * Show creation form.
//  */

// async function add(ctx) {
//   await ctx.render('new');
// }

// /**
//  * Show post :id.
//  */

// async function show(ctx) {
//   const id = ctx.params.id;
//   const post = posts[id];
//   if (!post) ctx.throw(404, 'invalid post id');
//   await ctx.render('show', { post: post });
// }

// /**
//  * Create a post.
//  */

// async function create(ctx) {
//   const post = ctx.request.body;
//   const id = posts.push(post) - 1;
//   post.created_at = new Date();
//   post.id = id;
//   ctx.redirect('/');
// }