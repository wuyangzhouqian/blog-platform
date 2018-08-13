'use strict';
import koa from 'koa';
import config from './config';
import render from 'koa-swig';
import co from 'co';
import serve from 'koa-static';
import errorHandle from './mddleware/errorHandle';
import log4js from 'log4js';
import { createContainer, Lifetime } from 'awilix';
import { scopePerRequest, loadControllers } from 'awilix-koa';

const app = new koa();

log4js.configure({
    appenders: { cheese: { type: 'file', filename: __dirname + '/logs/error.log' } },
    categories: { default: { appenders: ['cheese'], level: 'error' } }
});

const logger = log4js.getLogger('cheese');

// 创建IOC容器
const container = createContainer();
//每一次请求 都相当于new一次类
app.use(scopePerRequest(container));

// 转载services
container.loadModules([__dirname + '/services/*.js'], {
    formatName: 'camelCase',
    resolverOptions: {
        // We want instances to be scoped to the Koa request.
        // We need to set that up.
        lifetime: Lifetime.SCOPED // 生命周期
    }
});

// 配置模版
app.context.render = co.wrap(render({
    root: config.viewDir,
    autoescape: true,
    cache: 'memory',
    ext: 'html',
    varControls: ['[[', ']]',],
    writeBody: false,
}));

//node 容错
errorHandle.error(app, logger);

//自动注册所以的路由
app.use(loadControllers('controllers/*.js', { cwd: __dirname }));

//配置静态资源
app.use(serve(config.staticDir));

app.listen(config.port, () => {
    console.log(`server is running ${config.port}`);
});