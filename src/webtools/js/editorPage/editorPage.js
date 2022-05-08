import { Narea, expandElement } from "../../../lib/nframe.js";

var area = new Narea();
area.addChild(expandElement({
    text: "等待命令"
}));

window.addEventListener("message", e =>
{
    var data = e.data;
    if (typeof (data) == "object" && data.type == "order")
    {
        switch (data.operate)
        {
            case "empty":
                area.removeChilds();
                break;
            case "expand":
                var edObj = (typeof (data.content) == "string" ? JSON.parse(data.content) : data.content);
                area.addChild(expandElement(edObj));
                break;
            case "execFunction":
                (new Function(
                    data.content
                ))();
                break;
            default:
                break;
        }
    }
});