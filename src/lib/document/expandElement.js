import { forEach } from "../util/forEach.js";
import { Nelement } from "./element/Nelement.js";

/**
 * 展开元素
 * 将内容js对象转换为封装的HTML树
 * 请不要转换不受信任的json
 * @param {import("./interface/EleData").EleData | Object<string,any>} obj
 * @returns {Nelement}
 */
export function expandElement(obj)
{
    var now = new Nelement();
    if (obj.text)
        now.setText(obj.text);
    if (obj.height)
        now.setStyle("height", obj.height);
    if (obj.width)
        now.setStyle("width", obj.width);
    if (obj.position)
        now.setStyle("position", obj.position);
    if(obj.style)
        now.setStyles(obj.style);
    if (obj.child) // 若有子元素
    {
        forEach(obj.child, (o) => // 遍历
        {
            var child = expandElement(o);
            now.addChild(child);
        });
    }
    return now;
}