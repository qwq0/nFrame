/**
 * 键盘对应表
 */
var table = {
    "~": "`",
    "!": "1",
    "@": "2",
    "#": "3",
    "$": "4",
    "%": "5",
    "^": "6",
    "&": "7",
    "*": "8",
    "(": "9",
    ")": "0",
    "_": "-",
    "+": "=",
    "{": "[",
    "}": "]",
    "|": "\\",
    "\"": "\'",
    ":": ";",
    "<": ",",
    ">": ".",
    "?": "/"
};
var capitalA = "A".charCodeAt(0);
var lowercaseA = "a".charCodeAt(0);
for (var i = 0; i < 26; i++)
    table[String.fromCharCode(capitalA + i)] = String.fromCharCode(lowercaseA + i);
export { table };


var keyMap = new Map();
/**
 * 按下键时调用
 * @param {string} keyName
 * @returns {boolean}
 */
export function keyPress(keyName)
{
    if (keyMap.get(keyName))
        return false;
    keyMap.set(keyName, true);
    return true;
}
/**
 * 弹起键时调用
 * @param {string} keyName
 */
export function keyUp(keyName)
{
    keyMap.set(keyName, false);
}
