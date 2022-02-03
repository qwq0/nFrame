/**
 * 100%减去指定值
 * @param {string} value
 * @returns {string}
 */
function diFull(value)
{
    return ("calc(100% - " + value + ")");
}

/**
 * 构建rgb或rgba颜色颜色
 * @param {number | string} r 0~255
 * @param {number | string} g 0~255
 * @param {number | string} b 0~255
 * @param {number | string} [a] 0~1
 */
function rgb(r, g, b, a = 1)
{
    return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
}

/**
 * css生成
 */
export const cssG = {
    diFull,
    rgb
};