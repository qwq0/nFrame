import { expandElement } from "../../lib/nframe.js";
import { FsDApi } from "./fileSystemApi.js";



/**
 * 初始化模板页
 * @param {import("../../lib/nframe").Nelement} fPage
 */
export function initFilePage(fPage)
{
    var area = fPage.getArea();
    fPage.addChilds(expandElement({
        width: "100%",
        style: {
            borderBottom: "1px rgb(100, 100, 100) solid",
            paddingLeft: "1em"
        },
        text: "清空列表",
        event: {
            clickBind: () =>
            {
                area.getById("filePage_fileList").removeChilds();
            }
        }
    }), expandElement({
        width: "100%",
        style: {
            borderBottom: "1px rgb(100, 100, 100) solid",
            paddingLeft: "1em"
        },
        text: "点击选择文件夹",
        event: {
            clickBind: async () =>
            {
                var fsDApi = new FsDApi();
                await fsDApi.showDirectoryPicker();
                var fileList = await fsDApi.getFileList();
                fileList.forEach(o =>
                {
                    if (o.type == "file")
                        area.getById("filePage_fileList").addChild(expandElement({
                            width: "100%",
                            style: {
                                borderBottom: "1px rgb(100, 100, 100) solid",
                                paddingLeft: "1em"
                            },
                            text: o.name,
                            event: {
                                clickBind: async () =>
                                {
                                    area.getById("editorPage")
                                }
                            }
                        }));
                });
            }
        }
    }), expandElement({
        width: "100%",
        style: {
            borderBottom: "1px rgb(100, 100, 100) solid"
        },
        text: "文件列表(临时)",
    }));
    fPage.addChild(expandElement({
        id: "filePage_fileList"
    }));
}