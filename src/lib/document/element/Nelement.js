import { forEach } from "../../util/forEach.js";

/**
 * HTML元素封装
 */
export class Nelement
{
    /**
     * 元素对象
     * @package
     * @type {HTMLElement}
     */
    e = null;
    /**
     * 子元素
     * @private
     * @type {Array<Nelement>}
     */
    child = [];
    /**
     * 元素id
     * 空为无id
     * @private
     * @type {string}
     */
    id = "";
    /**
     * 元素属于的区域
     * @private
     * @typedef {import("./Narea").Narea} Narea
     * @type {Narea}
     */
    area = null;
    /**
     * 元素属于的父元素
     * 若父元素为Narea则为null
     * @private
     * @type {Nelement}
     */
    parent = null;
    /**
     * 元素的附加数据
     * @type {Object<string, any>}
     */
    data;

    /**
     * @param {string | HTMLElement} [ele]
     * @param {string} [id]
     */
    constructor(ele, id)
    {
        if (id)
            this.id = id;
        if (!ele)
            this.e = document.createElement("div");
        else if (typeof (ele) == "string")
            this.e = document.createElement(ele);
        else if (ele instanceof HTMLElement)
            this.e = ele;
        else
            throw "(Nelement) Unhandled parameter";
    }


    /**
     * 添加子节点
     * @param {Nelement} chi
     * @param {number} pos 添加到的位置 负数从后到前 超过范围或缺省添加到最后
     */
    addChild(chi, pos)
    {
        if (chi.parent)
            chi.remove();
        if (pos == null) // 缺省位置
        {
            this.child.push(chi);
            this.e.appendChild(chi.e);
        }
        else if (typeof (pos) == "number") // 数字位置
        {
            if (pos >= 0 || pos < this.child.length)
            {
                this.e.insertBefore(chi.e, this.child[pos].e);
                this.child.splice(pos, 0, chi);
            }
            else if (pos < 0 || pos >= (-this.child.length))
            {
                this.e.insertBefore(chi.e, this.child[this.child.length + pos].e);
                this.child.splice(this.child.length + pos, 0, chi);
            }
            else
            { }
        }
        chi.setArea(this.area);
        chi.parent = this;
    }

    /**
     * 查找子节点在当前节点中的位置
     * 不是子节点则返回-1
     * @param {Nelement} chi
     * @returns {number}
     */
    childInd(chi)
    {
        var ind = -1;
        forEach(this.child, (o, i) =>
        {
            if (o == chi)
            {
                ind = i;
                return true;
            }
        });
        return ind;
    }


    /**
     * 遍历设置元素的区域
     * @package
     * @param {Narea} area
     */
    setArea(area)
    {
        if (this.area == area)
            return;
        if (this.area)
        { // 清除原区域中的关联
            if (this.id)
                this.area.idMap.delete(this.id);
        }
        this.area = area;
        if (area)
        { // 在新区域中建立关联
            area.idMap.set(this.id, this);
        }
        if (this.child)
            forEach(this.child, (o) => { o.setArea(area); });
    }

    /**
     * 获取元素所在区域
     * @returns {Narea}
     */
    getArea() { return this.area; }

    /**
     * 移除此节点
     * 移除节点和树(其他节点)的关联
     */
    remove()
    {
        if (this.parent)
        {
            var index = this.parent.child.indexOf(this);
            if (index == -1)
                throw "(Nelement) Wrong tree structure";
            this.parent.child.splice(index, 1);
            this.e.remove();
            this.parent = null;
            this.setArea(null);
        }
        else if (this.area)
        {
            var index = this.area.child.indexOf(this);
            if (index == -1)
                throw "(Nelement) Wrong tree structure";
            this.area.child.splice(index, 1);
            this.e.remove();
            this.setArea(null);
        }
        else
            throw "(Nelement) Attempt to remove elements that do not exist in a tree";
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
     * 获取样式
     * @param {string} styleName
     * @returns {string}
     */
    getStyle(styleName)
    {
        return this.e.style[styleName];
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
     * 设置HTMLElement的属性
     * @param {string} attrName
     * @param {string} value
     */
    setAttr(attrName, value)
    {
        this.e[attrName] = value;
    }
    /**
     * 设置多个HTMLElement属性
     * @param {Object<string, string>} obj
     */
    setAttrs(obj)
    {
        forEach(Object.keys(obj), (key) => { this.e[key] = obj[key]; });
    }


    /**
     * 设置元素可见性
     * @param {"block" | "inline" | "none" | "inline-block"} s
     */
    setDisplay(s)
    {
        this.setStyle("display", s);
    }

    /**
     * 添加事件监听器
     * @param {string} eventName
     * @param {function(Event):void} callBack
     * @param {boolean | AddEventListenerOptions} options
     */
    addEventListener(eventName, callBack, options)
    {
        this.e.addEventListener(eventName, callBack, options);
    }
}