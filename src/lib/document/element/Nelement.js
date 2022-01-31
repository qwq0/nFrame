/**
 * HTML元素封装
 */
export class Nelement
{
    /**
     * 元素对象
     * @type {HTMLElement}
     */
    e = null;
    /**
     * 子元素
     * @type {Array<Nelement>}
     */
    child = null;

    /**
     * 修改样式
     */
    setStyle(styleName, value)
    {
        this.e.style[styleName] = value;
    }
    /**
     * 修改多个样式
     */
    setStyles(obj)
    {
        this.e.style[styleName] = value;
    }

    /**
     * 添加子节点
     * @param {Nelement} chi 
     */
    addChild(chi)
    {
        this.child.push(chi);
        this.e.appendChild(chi.e);
    }
}