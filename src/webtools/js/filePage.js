import { expandElement } from "../../lib/nframe.js";

/**
 * 从文件句柄中获取文件列表
 * @param {any} fileSystemDirectoryHandle
 * @returns {Promise<Array<{name:string, handle:any}>>}
 */
async function getFileList(fileSystemDirectoryHandle)
{
    var list = [];
    for await (const [key, value] of fileSystemDirectoryHandle.entries())
    {
        list.push({
            name: key,
            type: value.kind,
            handle: value
        });
    }
    list.sort((a, b) => (((a.type == "directory" && b.type == "file") || a.name < b.name) ? -1 : 1));
    return list;
}

/**
 * 初始化模板页
 * @param {import("../../lib/nframe").Nelement} fPage
 */
export function initFilePage(fPage)
{
    fPage.addChild(expandElement({
        width: "100%",
        style: {
            borderBottom: "1px rgb(100, 100, 100) solid",
            paddingLeft: "1em"
        },
        text: "点击选择文件夹",
        event: {
            clickBind: async () =>
            {
                // @ts-ignore
                var fileSystemDirectoryHandle = await window.showDirectoryPicker();

                var fileList = await getFileList(fileSystemDirectoryHandle);
                console.log(fileList);
                fileList.forEach(o =>
                {
                    fPage.getArea().getById("filePage_fileList").addChild(expandElement({
                        width: "100%",
                        style: {
                            borderBottom: "1px rgb(100, 100, 100) solid",
                            paddingLeft: "1em"
                        },
                        text: o.name,
                        event: {}
                    }));
                });
            }
        }
    }));
    fPage.addChild(expandElement({
        id: "filePage_fileList"
    }));
}