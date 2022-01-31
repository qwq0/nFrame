/**
 * 按帧节流函数(垂直同步)
 * 将导致异步调用
 * @param {Function} f 被节流的函数
 */
export function throttleFarm(f)
{
    /**
     * 参数
     * @type {Array}
     */
    var par = null;
    /**
     * 有缓冲的执行
     * @type {boolean}
     */
    var ex = false;
    /**
     * 立即执行函数
     */
    function immed()
    {
        f(...par);
        par = null;
        ex = true;
    }
    /**
     * 返回节流执行函数
     */
    return function (...arg)
    {
        par = arg;
        if (!ex)
        {
            requestAnimationFrame(immed);
            ex = true;
        }
    }
}