import { cssG, Narea, expandElement } from "../lib/nframe.js";

var area = new Narea();
area.addChild(expandElement({ // 整个
    width: "100%",
    height: "100%",
    position: "absolute",
    child: [{ // 顶栏
        text: "nFrame-webTools",
        height: "30px"
    },
    { // 中间
        height: cssG.diFull("60px"),
        child: [{ // 侧边栏
            height: "100%"
        },
        { // 操作菜单
            height: "100%"
        },
        { // 编辑器
            height: "100%"
        },
        { // 属性菜单
            height: "100%"
        }]
    },
    { // 底栏
        text: "无消息",
        height: "30px"
    }]
}));