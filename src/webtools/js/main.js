import { cssG, Narea, expandElement, Nelement } from "../../lib/nframe.js";
import { initElementTreePage } from "./elementTreePage.js";
import { initFilePage } from "./filePage.js";
import { initTempletPage } from "./templetPage.js";

var area = new Narea();
area.addChild(expandElement({ // 整个
    $width: "100%", $height: "100%",
    $position: "absolute",
    style: {
        userSelect: "none",
        backgroundColor: cssG.rgb(245, 245, 245)
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
            height: "100%", width: "250px",
            style: {
                borderRight: "1px black solid",
                boxSizing: "border-box"
            },
            child: [{ // 侧边栏标签
                id: "sideMenuBar",
                height: "100%", width: "3em",
                style: {
                    borderRight: "1px black solid",
                    lineHeight: "3em",
                    textAlign: "center"
                }
            }, { // 操作菜单
                id: "sideMenuPage",
                left: "3em", right: "0",
                height: "100%"
            }]
        },
        { // 编辑器
            height: "100%",
            left: "250px", right: "220px",
            child: [{
                tagName: "iframe",
                style: {
                    border: "none",
                    backgroundColor: "white"
                }
            }]
        },
        { // 属性菜单
            height: "100%", width: "220px",
            right: "0",
            style: {
                borderLeft: "1px black solid",
                boxSizing: "border-box"
            },
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

(function () // (自执行)
{ // 侧边栏
    var bar = area.getById("sideMenuBar"); // 标签栏
    var page = area.getById("sideMenuPage"); // 菜单
    /** @type {Nelement} */
    var nowPage = null;

    // 侧边栏标签按钮
    [{
        tabText: "文件",
        page: { // 文件页
            $width: "100%", $height: "100%",
            $position: "absolute",
            child: [{
                height: "1.5em",
                text: "文件",
                style: {
                    borderBottom: "1px black solid",
                    boxSizing: "border-box",
                    lineHeight: "1.5em"
                }
            }, {
                id: "filePage",
                top: "1.5em", bottom: "0",
                overflow: "hidden auto"
            }]
        }
    }, {
        tabText: "模板",
        page: { // 模板页
            $width: "100%", $height: "100%",
            $position: "absolute",
            child: [{
                height: "1.5em",
                text: "模板",
                style: {
                    borderBottom: "1px black solid",
                    boxSizing: "border-box",
                    lineHeight: "1.5em"
                }
            }, {
                id: "templetPage",
                top: "1.5em", bottom: "0",
            }]
        }
    }, {
        tabText: "元素树",
        page: { // 元素树页
            $width: "100%", $height: "100%",
            $position: "absolute",
            child: [{
                height: "1.5em",
                text: "元素树",
                style: {
                    borderBottom: "1px black solid",
                    boxSizing: "border-box",
                    lineHeight: "1.5em"
                }
            }, {
                id: "elementTreePage",
                top: "1.5em", bottom: "0",
            }]
        }
    }].forEach((o) => // 生成标签列表
    {
        var thisPage = expandElement(o.page);

        bar.addChild(expandElement({ // 将标签添加到菜单
            height: "3em", width: "3em",
            style: {
                borderBottom: "1px black solid",
                boxSizing: "border-box"
            },
            event: {
                clickBind: () =>
                {
                    if (nowPage)
                        nowPage.setDisplay("none");
                    thisPage.setDisplay("block");
                    nowPage = thisPage;
                }
            },
            text: o.tabText
        }));

        page.addChild(thisPage);
        thisPage.setDisplay("none");
    });

    initFilePage(area.getById("filePage"));
    initTempletPage(area.getById("templetPage"));
    initElementTreePage(area.getById("elementTreePage"));
})();