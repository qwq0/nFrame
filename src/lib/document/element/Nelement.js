import { forEach } from "../../util/forEach.js";

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
    child = [];
    /**
     * 元素id
     * 空为无id
     * @type {string}
     */
    id = "";
    /**
     * 元素属于的区域
     * @type {import("../Narea").Narea}
     */
    area = null;

    /**
     * @param {string | HTMLElement} [ele]
     */
    constructor(ele)
    {
        if (typeof (ele) == "string")
            this.e = document.createElement(ele);
        else if (ele instanceof HTMLElement)
            this.e = ele;
        else
            this.e = document.createElement("div");
    }

    /**
     * 修改样式
     * @param {string} styleName
     * @param {string} value
     */
    setStyle(styleName, value)
    {
        this.e.style[styleName] = value;
    }
    /**
     * 修改多个样式
     * @param {Object<string, string>} obj
     */
    setStyles(obj)
    {
        forEach(Object.keys(obj), (key) => { this.e.style[key] = obj[key]; });
    }
    /**
     * 修改文本
     * @param {string} text
     */
    setText(text)
    {
        this.e.innerText = text;
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

    /**
     * 遍历设置元素的区域
     * @param {import("../Narea").Narea} area
     */
    setArea(area)
    {
        this.area = area;
        if (this.child)
            forEach(this.child, (o) =>
            {
                if (o.area != area)
                    o.setArea(area);
            });
    }
}