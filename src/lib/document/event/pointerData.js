/**
 * 指针数据
 * 当发生鼠标或触摸事件时传递
 * 包含指针坐标和按下状态等数据
 */
export class pointerData
{
    /**
     * 当前指针位置x
     * @type {number}
    */
    x = 0;
    /**
     * 当前指针位置y
     * @type {number}
    */
    y = 0;
    /**
     * 指针位置和上次位置的变化x
     * @type {number}
    */
    vx = 0;
    /**
     * 指针位置和上次位置的变化y
     * @type {number}
    */
    vy = 0;
    /**
     * 此指针的起始位置x
     * @type {number}
    */
    sx = 0;
    /**
     * 此指针的起始位置y
     * @type {number}
    */
    sy = 0;
    /**
     * 当前此指针是否处于按下状态
     * @type {boolean}
    */
    hold = false;
    /**
     * 当前指针是否正在按下(按下事件)
     * @type {boolean}
    */
    pressing = false;
    
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} vx
     * @param {number} vy
     * @param {number} sx
     * @param {number} sy
     * @param {boolean} hold
     * @param {boolean} pressing
     */
    constructor(x, y, vx, vy, sx, sy, hold, pressing)
    {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.sx = sx;
        this.sy = sy;
        this.hold = hold;
        this.pressing = pressing;
    }
}