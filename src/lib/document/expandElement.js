import { forEach } from "../util/forEach.js";
import { Nelement } from "./element/Nelement.js";


/**
 * 遍历展开元素
 * @param {import("./interface/EleData").EleData | Object<string,any>} obj
 * @returns {Nelement}
*/
function expEle(obj)
{
    var now = new Nelement();

    forEach([
        "height",
        "width",
        "position",
        "top",
        "left",
        "right",
        "bottom",
        "display"
    ], (key) =>
    {
        if (obj[key])
            now.setStyle(key, obj[key]);
    });

    if (obj.style)
        now.setStyles(obj.style);
    if (obj.text)
        now.setText(obj.text);
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
 * @param {import("./interface/EleData").EleData | Object<string, any>} obj
 * @param {Object<string, any>} def
 * @returns {import("./interface/EleData").EleData | Object<string, any>}
 */
function preC(obj, def)
{
    var now = {};
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
    if (obj.child) // 若有子元素
    {
        /**
         * @type {Array<import("./interface/EleData").EleData | Object<string, any>>}
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
 * @param {import("./interface/EleData").EleData | Object<string,any>} obj
 * @returns {Nelement}
 */
export function expandElement(obj)
{
    return expEle(preC(obj, {}));
}