import { cssG, Narea, expandElement } from "../lib/nframe.js";

var area = new Narea();
area.addChild(expandElement({ // 整个
    $width: "100%", height: "100%",
    $position: "absolute",
    style: {
        userSelect: "none",
        backgroundColor: cssG.rgb(245, 245, 245),
    },
    child: [{ // 顶栏
        text: "nFrame-webTools 开始",
        height: "1.5em",
        style: {
            borderBottom: "1px black solid",
            boxSizing: "border-box"
        }
    },
    { // 中间
        top: "1.5em", bottom: "1.5em",
        child: [{ // 侧边栏
            height: "100%", width: "15em",
            child: [{ // 侧边栏标签
                height: "100%",
                width: "3em",
            }, { // 操作菜单
                height: "100%"
            }]
        },
        { // 编辑器
            height: "100%"
        },
        { // 属性菜单
            height: "100%"
        }]
    },
    { // 底栏
        text: "无通知或警告",
        bottom: "0", height: "1.5em",
        style: {
            borderTop: "1px black solid",
            boxSizing: "border-box"
        }
    }]
}));