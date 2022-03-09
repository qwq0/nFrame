import { keyPress, keyUp, table } from "./keyboardTable.js";
import { keyData } from "./keyData.js";

/**
 * 键盘 事件处理
 * @param {HTMLElement} element
 * @param {function(keyData):void} callBack
 */
export function keyboardBind(element, callBack)
{
    element.addEventListener("keydown", e =>
    {
        var keyName = (table[e.key] ? table[e.key] : e.key);
        callBack(new keyData(
            keyName,
            true,
            keyPress(keyName)
        ))
    });
    element.addEventListener("keyup", e =>
    {
        var keyName = (table[e.key] ? table[e.key] : e.key);
        keyUp(keyName);
        callBack(new keyData(
            keyName,
            false,
            false
        ))
    });
}