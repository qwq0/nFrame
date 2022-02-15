import { Nelement } from "../element/Nelement.js";

/**
 * 点击事件处理
 * @param {Nelement} element 绑定到元素
 * @param {function():void} callBack 回调
 */
export function clickBind(element, callBack)
{
    element.addEventListener("click", (/** @type {MouseEvent} */ e) => callBack(), false);

}