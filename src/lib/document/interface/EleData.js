/**
 * dom节点数据接口
 * 树状结构
 * 此接口中的任何成员都可能不存在
 */
export class EleData
{
    /**
     * 距左边
     * @type {string}
     */
    left;
    /**
     * 距顶边
     * @type {string}
     */
    top;
    /**
     * 宽度
     * @type {string}
     */
    width;
    /**
     * 高度
     * @type {string}
     */
    height;
    /**
     * 定位方式
     * @type {"absolute" | "static" | "relative" | "fixed"}
     */
    position;
    /**
     * 类型
     * @type {string}
     */
    type;
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
     * 子节点
     * @type {Array<EleData>}
     */
    child;
}