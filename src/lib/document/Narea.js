/**
 * 区域类
 * 管理一个dom子树
 */
export class Narea
{
    /**
     * 视口元素
     * @type {HTMLElement}
     */
    view = null;
    /**
     * 子元素
     * @type {Array<import("./element/Nelement").Nelement>}
    */
    child = [];

    /**
     * 管理id对应表
     * @type {Map<string, import("./element/Nelement").Nelement>}
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
     * @param {import("./element/Nelement").Nelement} chi 
     */
    addChild(chi)
    {
        this.child.push(chi);
        this.view.appendChild(chi.e);
        chi.setArea(this);
    }
}