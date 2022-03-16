import { Nelement } from "../Nelement.js";

/**
 * iframe标签上下文
 */
export class Ntag_iframe
{
    /**
     * 元素封装
     * @private
     * @type {Nelement}
     */
    nelement = null;

    /**
     * 元素对象
     * @private
     * @type {HTMLIFrameElement}
     */
    e = null;

    /**
     * @param {Nelement} nelement
     */
    constructor(nelement)
    {
        if (!(nelement.e instanceof HTMLIFrameElement))
            throw "(Ntag_iframe) Wrong tagType(tag name)";
        this.nelement = nelement;
        this.e = nelement.e;
    }

    /**
     * 刷新
     * 仅设置src属性时
     */
    reload()
    {
        this.e.contentWindow.location.replace(this.e.src);
    }

    /**
     * 设置src
     * 通常这将使iframe跳转到指定src
     * @param {string} src
     */
    setSrc(src)
    {
        this.e.src = src;
    }
    /**
     * 设置srcdoc
     * 通常这将使iframe显示指定dom字符串
     * @param {string} srcdoc
     */
    setSrcdoc(srcdoc)
    {
        this.e.srcdoc = srcdoc;
    }
}