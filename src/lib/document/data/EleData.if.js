/**
 * dom节点数据接口
 * 树状结构
 * 此接口中的任何成员都可能不存在
 * @interface
*/
export class EleData
{
    /**
     * id
     * 在Narea中的id
     * @type {string}
    */
    id;
    /**
     * 距左边(style)
     * @type {string}
    */
    left;
    /**
     * 距顶边(style)
     * @type {string}
    */
    top;
    /**
     * 距右边(style)
     * @type {string}
    */
    right;
    /**
     * 距底边(style)
     * @type {string}
    */
    bottom;
    /**
     * 宽度
     * @type {string}
    */
    width;
    /**
     * 高度(style)
     * @type {string}
    */
    height;
    /**
     * 定位方式(style)
     * @type {"static" | "absolute" | "relative" | "fixed"}
    */
    position;
    /**
     * 显示方式(style)
     * @type {"block" | "inline" | "none" | "inline-block"}
    */
    display;
    /**
     * 超出部分(style)
     * @typedef {"visible" | "hidden" | "scroll"} overflowValue
     * @type {overflowValue | `${overflowValue} ${overflowValue}`}
     */
    overflow;
    /**
     * html标签名(标签类型)
     * @type {string}
    */
    tagName;
    /**
     * 文本
     * @type {string}
    */
    text;
    /**
     * 样式对象
     * @type {Object<string, string>}
    */
    style;
    /**
     * 属性对象
     * HTMLElement的附加属性
     * @type {Object<string, string>}
    */
    attr;
    /**
     * 事件绑定
     */
    event = {
        /**
         * 绑定鼠标事件
         * @type {function(import("../event/pointerData").pointerData)}
        */
        mouseBind: null,
        /**
         * 绑定点击事件
         * @type {function()}
        */
        clickBind: null
    };
    /**
     * 子节点
     * @type {Array<EleData>}
    */
    child;
}