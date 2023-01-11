const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer
const path = require('path')
module.exports = {
    configureWebpack: config => {
        if (process.env.NODE_ENV !== 'production') return;
        return {
            plugins: [
                new PrerenderSPAPlugin({
                   //网页包的路径将应用程序输出到prerender
                    staticDir: path.join(__dirname,'dist'),
                    //Routes to render 对应自己router
                    routes: ['/', '/home','/blog','/aboutMe','/message'],
                    renderer: new Renderer({
                        inject: {
                            foo: 'bar'
                        },
                        //渲染时显示浏览器窗口。对调试有用。
                        headless: false,
                        // // 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
                        renderAfterDocumentEvent: 'render-event'
                    })
                }),
            ],
        };
    }
}