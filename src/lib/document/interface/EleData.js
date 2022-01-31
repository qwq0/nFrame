/**
 * dom节点数据接口
 * 树状结构
 * 此接口中的任何成员都可能不存在
 */
export class EleData
{
    /**
     * 距左边
     * @type {string | number}
     */
    left;
    /**
     * 距顶边
     * @type {string | number}
     */
    top;
    /**
     * 宽度
     * @type {string | number}
     */
    width;
    /**
     * 高度
     * @type {string | number}
     */
    height;
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
     * 子节点
     * @type {Array<EleData>}
     */
    child;
}