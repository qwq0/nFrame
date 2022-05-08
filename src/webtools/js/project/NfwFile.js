/**
 * 解析和保存nfw.js文件
 */
export class NfwFile
{
    /**
     * 界面对象
     * @type {import("../../../lib/document/data/EleData.if").EleData}
     */
    interf;
    /**
     * 
     */
    config;

    /**
     * 解析字符串到NfwFile
     * @param {string} str
     */
    constructor(str)
    {
        str = str.replace("\r", "") + "\n"; // 去除\r 在最后加入\n
        if (str.slice(0, 8) != "/*nfw*/\n") // 判断文件头
            throw "NfwFile: Not an NFW file";
        var part = str.split("/*nfwSepar*/\n"); // 分割文件
        for (var i = 0; i < part.length; i++)
            part[i] = part[i].trim(); // 去除每段首尾空格空行
        part.forEach(o =>
        { // 遍历每个部分
            if (o == "")
                return;
            var label = ; // 标记
        });
    }


    /**
     * 保存为字符串
     * @returns {string}
     */
    serialization()
    {
        var str = "";
        return str;
    }
}