import { forEach, isAmong } from "../../util/forEach.js";

/**
 * HTML元素封装
 * 
 * 不要继承此类除非你知道你在做什么
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
     * 节点隔离
     * 此节点不再向下传递数据
     * 包括area
     * @package
     * @type {boolean}
     */
    isol = false;
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
     * 元素的标签名
     * @package
     */
    tagName;

    /**
     * 创建或封装元素
     * @param {string | HTMLElement} [ele] 传递字符串创建元素 传递HTMLElement封装元素 缺省为"div"
     * @param {string} [id] 元素的id
     */
    constructor(ele, id)
    {
        if (id)
            this.id = id;
        if (!ele)
        {
            this.tagName = "div";
            this.e = document.createElement("div");
        }
        else if (typeof (ele) == "string")
        {
            this.tagName = ele;
            this.e = document.createElement(ele);
        }
        else if (ele instanceof HTMLElement)
        { // 未完善已有元素封装
            this.e = ele;
            this.tagName = ele.tagName.toLowerCase();
            if (this.tagName != "body")
                console.warn("(Nelement) Wrapping already created elements can cause some problems");
        }
        else
            throw "(Nelement) Unhandled parameter";
    }


    /**
     * 添加单个子节点
     * 若子节点之前在树中则先移除后加入
     * @param {Nelement} chi
     */
    addChild(chi)
    {
        if (chi.parent)
            chi.remove();
        this.child.push(chi);
        this.e.appendChild(chi.e);
        chi.setArea(this.area);
        chi.parent = this;
    }

    /**
     * 添加多个子节点
     * 若子节点之前在树中则先移除后加入
     * @param {Array<Nelement | Array<Nelement>>} chi
     */
    addChilds(...chi)
    {
        forEach(chi, o =>
        {
            if (Array.isArray(o))
                forEach(o, s => this.addChild(s));
            else if (typeof (o) == "object")
                this.addChild(o);
        });
    }

    /**
     * 插入单个子节点(在中间)
     * 如果此节点之前在树中则先移除后加入
     * @param {Nelement} chi
     * @param {number} pos 添加到的位置 负数从后到前 超过范围添加到最后
     */
    insChild(chi, pos)
    {
        if (chi.parent)
            chi.remove();
        if (typeof (pos) == "number") // 数字位置
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
            {
                this.child.push(chi);
                this.e.appendChild(chi.e);
            }
        }
        chi.setArea(this.area);
        chi.parent = this;
    }

    /**
     * 查找子节点在当前节点中的位置
     * 从0开始
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
     * @param {boolean} [isol] 为true时隔离此元素 并可对隔离的元素进行修改区域
     */
    setArea(area, isol)
    {
        if (isol) // 设置隔离
            this.isol = true;
        if (this.area == area || (this.isol && (!isol))) // 无需向下或已隔离
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
        if (this.child) // 遍历子节点
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
        var index = -1;
        if (this.parent)
        {
            index = this.parent.child.indexOf(this);
            if (index == -1)
                throw "(Nelement) Wrong tree structure";
            this.parent.child.splice(index, 1);
            this.e.remove();
            this.parent = null;
            this.setArea(null);
        }
        else if (this.area)
        {
            index = this.area.child.indexOf(this);
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
     * 移除此节点的子节点
     * @param {number} [begin] 开始删除的子节点下标 缺省则为从0开始
     * @param {number} [end] 结束删除的子节点下标 不包含end 缺省则为到结尾
     */
    removeChilds(begin = 0, end = this.child.length)
    {
        if (end > this.child.length)
            end = this.child.length;
        for (var i = begin; i < end; i++)
            this.child[begin].remove();
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
     * @param {Object<string, string | number | Object>} obj
     */
    setStyles(obj)
    {
        forEach(Object.keys(obj), (key) =>
        {
            var value = obj[key];
            if (isAmong(typeof (value), "number", "string"))
                this.e.style[key] = obj[key];
        });
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
     * 获取HTMLElement的属性
     * @param {string} attrName
     * @returns {string}
     */
    getAttr(attrName)
    {
        return this.e[attrName];
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
     * @param {boolean | AddEventListenerOptions} [options]
     */
    addEventListener(eventName, callBack, options)
    {
        this.e.addEventListener(eventName, callBack, options);
    }

    /**
     * 移除事件监听器
     * @param {string} eventName
     * @param {function(Event):void} callBack
     * @param {boolean | EventListenerOptions} [options]
     */
    removeEventListener(eventName, callBack, options)
    {
        this.e.removeEventListener(eventName, callBack, options);
    }
}