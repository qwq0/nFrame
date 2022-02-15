/**
 * 区域类
 * 管理一个dom子树
*/
export class Narea
{
    /**
     * 视口元素
     * @private
     * @type {HTMLElement}
    */
    view = null;
    /**
     * 子元素
     * @package
     * @typedef {import("./Nelement").Nelement} Nelement
     * @type {Array<Nelement>}
    */
    child = [];

    /**
     * 管理id对应表
     * @package
     * @type {Map<string, Nelement>}
    */
    idMap = new Map();

    /**
     * @param {HTMLElement} [view]
    */
    constructor(view)
    {
        if(view)
            this.view = view;
        else
            this.view = document.body;
        this.view.style.margin = "0";
    }

    /**
     * 添加子节点
     * @param {Nelement} chi 
    */
    addChild(chi)
    {
        this.child.push(chi);
        this.view.appendChild(chi.e);
        chi.setArea(this);
    }

    /**
     * 通过id查找并获取元素
     * @param {string} [id]
     * @returns {Nelement}
     */
    getById(id)
    {
        return this.idMap.get(id);
    }
}