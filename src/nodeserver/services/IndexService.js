/**
 * @fileOverview 实现index 数据类型
 * @author wayne
 */
/**
* IndexModle类 生产一段异步数据
* @class
*/
export default class IndexService {
    /**
     * @constructor
     * @param {string} app koa2 上下文
     */
    constructor() { }
    /**
     * @returns {Promises} 返回异步数据
     * @example
     * return new Promis
     * getData()
     */
    getData() {
        return new Promise((resolve) => {
            resolve('IndexData返回一段异步数据哈哈');
        });
    }
}