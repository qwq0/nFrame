import { Nelement } from "./Nelement.js";

/**
 * 区域类
 * 管理一个dom子树
 * 
 * 不要继承此类除非你知道你在做什么
 * @extends Nelement
*/
export class Narea extends Nelement
{
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
        super(view ? view : document.body);
        this.setArea(this);
        this.setStyle("margin", "0");
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