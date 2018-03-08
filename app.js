const Koa = require('koa');
const render = require('./lib/render');
const logger = require('koa-logger');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const log = require('./lib/log');
const db = require('./lib/db/index');
const util = require('./lib/util');
const mail = require('./lib/mail');
const apiMonitor = require('./collection/apiMonitor/index');
const app = new Koa();

// middleware
app.use(cors());
app.use(logger());
app.use(render);
app.use(bodyParser());

// route definitions
// api_monitor api监控
router.get('/mc', ctx => {
  const type = ctx.query.monitorType
  switch (type){
    case 'apiMonitor':
      apiMonitor.request(ctx)
    case 'errorMonitor':
      apiMonitor.request(ctx)
    default: 
      apiMonitor.request(ctx)
  }
})

router.get('/am', apiMonitor.request);
router.post('/am', apiMonitor.request);

app.use(router.routes());

if (!module.parent) {
  app.listen(8000)
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