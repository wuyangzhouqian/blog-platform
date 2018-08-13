'use strict';
const errorHandle = {
    error(app, logger) {
        app.use(async (ctx,next)=>{
            try {
                await next();
            } catch (error) {
                //记录报错日志
                logger.error(error);

                //设置返回状态
                ctx.status = 200;
                ctx.body = '请求出错';
            }
        });

        app.use(async (ctx, next) => {
            await next();
            if (404 != ctx.status) return;
            ctx.body = '<script type="text/javascript" src="//www.qq.com/404/search_children.js" charset="utf-8" homePageUrl="/" homePageName="返回"></script>';
        });
    }
};
export default errorHandle;