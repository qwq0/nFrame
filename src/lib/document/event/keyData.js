/**
 * 按键数据
 * 当发生键盘事件时传递
 * 包含按键和按下状态等数据
 */
export class keyData
{
    /**
     * 操作的键名
     * @type {string}
     */
    key = "";
    /**
     * 当前键目前是否被按下
     * @type {boolean}
     */
    hold = false;
    /**
     * 当前键是否刚按下
     * (键按下时第一次为true)
     * @type {boolean}
     */
    pressing = false;
    constructor(key, hold, pressing)
    {
        this.key = key;
        this.hold = hold;
        this.pressing = pressing;
    }
}