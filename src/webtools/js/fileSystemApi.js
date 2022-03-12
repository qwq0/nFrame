/**
 * 基于Chrome中的文件Api的文件读取实现
*/

/**
 * 文件系统-文件夹句柄
 */
export class FsDApi
{
    /**
     * 句柄
     * @type {any}
     */
    handle;

    /**
     * @param {any} [handle]
     */
    constructor(handle)
    {
        if (handle)
            this.handle = handle;
    }

    /**
     * 显示文件选择器
     */
    async showDirectoryPicker()
    {
        //@ts-ignore
        this.handle = await window.showDirectoryPicker()
    }

    /**
     * 获取文件列表
     * 按照先文件夹后文件 按字符串排序
     * @returns {Promise<Array<{name: string, fsApi: (FsDApi | FsFApi), type: ("directory"|"file")}>>}
     */
    async getFileList()
    {
        var list = [];
        for await (const [key, value] of this.handle.entries())
        {
            var now = {
                /** @type {string} */
                name: key,
                /** @type {"directory"|"file"} */
                type: value.kind,
                /** @type {FsDApi | FsFApi} */
                fsApi: null
            }
            if (now.type == "directory")
                now.fsApi = new FsDApi(value);
            else
                now.fsApi = new FsFApi(value);
            list.push(now);
        }
        list.sort((a, b) => (((a.type == "directory" && b.type == "file") || a.name < b.name) ? -1 : 1));
        return list;
    }
}

/**
 * 文件系统-文件句柄
 */
export class FsFApi
{
    /**
     * 句柄
     * @type {any}
     */
    handle;

    /** 
     * @param {any} [handle]
     */
    constructor(handle)
    {
        if (handle)
            this.handle = handle;
    }

    /**
     * 获取文件对象
     * @returns {Promise<File>}
     */
    async getFile()
    {
        return await this.handle.getFile();
    }

}