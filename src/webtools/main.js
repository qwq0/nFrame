import { Narea, expandElement } from "../lib/nframe.js";

var area = new Narea();
expandElement({ // 整个
    child: [{ // 顶栏
        text: "nFrame-webTools"
    },
    { // 中间
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
        text: "无消息"
    }]
});