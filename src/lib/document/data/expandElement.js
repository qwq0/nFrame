import { forEach } from "../../util/forEach.js";
import { Nelement } from "../element/Nelement.js";
import { bindTable } from "../event/bindTable.js";


/**
 * 遍历展开元素
 * @typedef {import("./EleData.if").EleData | Object<string, any>} EDObj
 * @param {EDObj} obj
 * @returns {Nelement}
*/
function expEle(obj)
{
    var now = new Nelement((obj.tagName ? obj.tagName : "div"), obj.id);

    forEach([
        "height",
        "width",
        "position",
        "top",
        "left",
        "right",
        "bottom",
        "display",
        "overflow"
    ], (key) =>
    {
        if (obj[key])
            now.setStyle(key, obj[key]);
    });

    if (obj.style)
        now.setStyles(obj.style);
    if (obj.text)
        now.setText(obj.text);
    if (obj.attr)
        now.setAttrs(obj.attr);
    if (obj.event) // 如果有绑定事件
    {
        forEach(Object.keys(obj.event), (key) => { bindTable[key](now, obj.event[key]); });
    }
    if (obj.child) // 若有子元素
    {
        forEach(obj.child, (o) => // 遍历
        {
            now.addChild(expEle(o));
        });
    }
    return now;
}

/**
 * 遍历预处理
 * @param {EDObj} obj
 * @param {Object<string, any>} def
 * @returns {EDObj}
*/
function preC(obj, def)
{
    /**
     * @type {EDObj}
     */
    var now = {};
    /**
     * @type {EDObj}
     */
    var nowDef = {};
    forEach(Object.keys(def), (key) => { now[key] = def[key]; });
    forEach(Object.keys(obj), (key) =>
    {
        if (key != "child")
        {
            if (key[0] == "$")
            {
                let rKey = key.slice(1);
                nowDef[rKey] = def[rKey];
                now[rKey] = def[rKey] = obj[key];
            }
            else if (key.slice(-1) == "$")
            {
                let rKey = key.slice(0, -1);
                nowDef[rKey] = def[rKey];
                def[rKey] = obj[key];
            }
            else
                now[key] = obj[key];
        }
    });

    if (now.left && now.right && now.width)
        delete (now.width);
    if (now.top && now.bottom && now.height)
        delete (now.height);

    if (obj.child) // 若有子元素
    {
        /**
         * @type {Array<EDObj>}
        */
        now.child = [];
        forEach(obj.child, (o) => // 遍历
        {
            now.child.push(preC(o, def));
        });
    }
    forEach(Object.keys(nowDef), (key) => { def[key] = nowDef[key]; });
    return now;
}

/**
 * 展开元素
 * 将内容js对象转换为封装的HTML树
 * 请不要转换不受信任的json
 * @param {EDObj} obj EleData格式的对象
 * @returns {Nelement}
*/
export function expandElement(obj)
{
    return expEle(preC(obj, {}));
}