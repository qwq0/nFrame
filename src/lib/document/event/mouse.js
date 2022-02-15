import { Nelement } from "../element/Nelement.js";
import { pointerData } from "./pointerData.js";

/**
 * 鼠标(拖拽)事件处理
 * @param {Nelement} element 绑定到元素
 * @param {function(pointerData):void} callBack 回调
 * @param {number} [button] 绑定的按键
 */
export function mouseBind(element, callBack, button = 0)
{
    element.addEventListener("mousedown", (/** @type {MouseEvent} */ e) => mouseDown(e), false);

    var mousemoveP = (/** @type {MouseEvent} */ e) => mouseMove(e);
    var mouseupP = (/** @type {MouseEvent} */ e) => mouseUp(e);

    var x = 0, y = 0;
    var sx = 0, sy = 0;
    var leftDown = false;
    /**
     * 鼠标处理函数(按下)
     * @param {MouseEvent} e 
     */
    function mouseDown(e)
    {
        if (e.cancelable)
            e.preventDefault();
        sx = x = e.clientX;
        sy = y = e.clientY;
        window.addEventListener("mousemove", mousemoveP, true);
        window.addEventListener("mouseup", mouseupP, true);
        if (e.button == button)
        {
            leftDown = true;
            callBack(new pointerData(
                x, y,
                0, 0,
                x, y,
                true, true
            ));
        }
    }
    /**
     * 鼠标处理函数(移动)
     * @param {MouseEvent} e 
     */
    function mouseMove(e)
    {
        if (leftDown)
        {
            // e.preventDefault();
            var vx = e.clientX - x;
            var vy = e.clientY - y;
            x = e.clientX;
            y = e.clientY;
            callBack(new pointerData(
                x, y,
                vx, vy,
                sx, sy,
                true, false
            ));
        }
    }
    /**
     * 鼠标处理函数(松开)
     * @param {MouseEvent} e 
     */
    function mouseUp(e)
    {
        var vx = e.clientX - x;
        var vy = e.clientY - y;
        x = e.clientX;
        y = e.clientY;
        window.removeEventListener("mousemove", mousemoveP, false);
        window.removeEventListener("mouseup", mouseupP, false);
        if (leftDown && e.button == button)
        {
            leftDown = false;
            callBack(new pointerData(
                x, y,
                vx, vy,
                sx, sy,
                false, false
            ));
        }
    }
}