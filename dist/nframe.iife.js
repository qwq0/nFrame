var nFrame = (function (exports) {
    'use strict';

    /**
     * 正向遍历数组
     * 在回调中返回不为false或void的值主动结束遍历
     * 主动结束遍历 返回true
     * 未主动结束遍历完全部内容 返回false
     * @template T
     * @param {ArrayLike<T>} o
     * @param {function(T, number):(boolean | void)} callback
     * @returns {boolean}
     */
    function forEach(o, callback)
    {
        if (!o)
            return false;
        for (var i = 0, Li = o.length; i < Li; i++)
            if (o[i] != undefined && callback(o[i], i))
                return true;
        return false;
    }

    /**
     * 判断第一个参数是否属于之后所有的参数
     * 第一个参数与任何一个之后的参数相等 返回true
     * 与任何一个都不相等 返回false
     * @param {any} k
     * @param  {...any} s
     * @returns {boolean}
     */
    function isAmong(k, ...s)
    {
        return forEach(s, o => o == k);
    }

    /**
     * HTML元素封装
     * 
     * 不要继承此类除非你知道你在做什么
     */
    class Nelement
    {
        /**
         * 元素对象
         * @private
         * @type {HTMLElement}
         */
        e = null;
        /**
         * 子元素
         * @private
         * @type {Array<Nelement>}
         */
        child = [];
        /**
         * 元素id
         * 空为无id
         * @private
         * @type {string}
         */
        id = "";
        /**
         * 元素属于的区域
         * @private
         * @typedef {import("./Narea").Narea} Narea
         * @type {Narea}
         */
        area = null;
        /**
         * 节点隔离
         * 此节点不再向下传递数据
         * 包括area
         * @package
         * @type {boolean}
         */
        isol = false;
        /**
         * 元素属于的父元素
         * 若父元素为Narea则为null
         * @private
         * @type {Nelement}
         */
        parent = null;
        /**
         * 元素的附加数据
         * @type {Object<string, any>}
         */
        data;

        /**
         * 创建或封装元素
         * @param {string | HTMLElement} [ele] 传递字符串创建元素 传递HTMLElement封装元素 缺省为"div"
         * @param {string} [id] 元素的id
         */
        constructor(ele, id)
        {
            if (id)
                this.id = id;
            if (!ele)
                this.e = document.createElement("div");
            else if (typeof (ele) == "string")
                this.e = document.createElement(ele);
            else if (ele instanceof HTMLElement)
                this.e = ele;
            else
                throw "(Nelement) Unhandled parameter";
        }


        /**
         * 添加子节点
         * @param {Nelement} chi
         * @param {number} [pos] 添加到的位置 负数从后到前 超过范围或缺省添加到最后
         */
        addChild(chi, pos)
        {
            if (chi.parent)
                chi.remove();
            if (pos == null) // 缺省位置
            {
                this.child.push(chi);
                this.e.appendChild(chi.e);
            }
            else if (typeof (pos) == "number") // 数字位置
            {
                if (pos >= 0 || pos < this.child.length)
                {
                    this.e.insertBefore(chi.e, this.child[pos].e);
                    this.child.splice(pos, 0, chi);
                }
                else if (pos < 0 || pos >= (-this.child.length))
                {
                    this.e.insertBefore(chi.e, this.child[this.child.length + pos].e);
                    this.child.splice(this.child.length + pos, 0, chi);
                }
                else
                ;
            }
            chi.setArea(this.area);
            chi.parent = this;
        }

        /**
         * 查找子节点在当前节点中的位置
         * 不是子节点则返回-1
         * @param {Nelement} chi
         * @returns {number}
         */
        childInd(chi)
        {
            var ind = -1;
            forEach(this.child, (o, i) =>
            {
                if (o == chi)
                {
                    ind = i;
                    return true;
                }
            });
            return ind;
        }


        /**
         * 遍历设置元素的区域
         * @package
         * @param {Narea} area
         * @param {boolean} [isol] 为true时隔离此元素 并可对隔离的元素进行修改区域
         */
        setArea(area, isol)
        {
            if (isol) // 设置隔离
                this.isol = true;
            if (this.area == area || (this.isol && (!isol))) // 无需向下或已隔离
                return;
            if (this.area)
            { // 清除原区域中的关联
                if (this.id)
                    this.area.idMap.delete(this.id);
            }
            this.area = area;
            if (area)
            { // 在新区域中建立关联
                area.idMap.set(this.id, this);
            }
            if (this.child) // 遍历子节点
                forEach(this.child, (o) => { o.setArea(area); });
        }

        /**
         * 获取元素所在区域
         * @returns {Narea}
         */
        getArea() { return this.area; }

        /**
         * 移除此节点
         * 移除节点和树(其他节点)的关联
         */
        remove()
        {
            if (this.parent)
            {
                var index = this.parent.child.indexOf(this);
                if (index == -1)
                    throw "(Nelement) Wrong tree structure";
                this.parent.child.splice(index, 1);
                this.e.remove();
                this.parent = null;
                this.setArea(null);
            }
            else if (this.area)
            {
                var index = this.area.child.indexOf(this);
                if (index == -1)
                    throw "(Nelement) Wrong tree structure";
                this.area.child.splice(index, 1);
                this.e.remove();
                this.setArea(null);
            }
            else
                throw "(Nelement) Attempt to remove elements that do not exist in a tree";
        }

        /**
         * 修改样式
         * @param {string} styleName
         * @param {string} value
         */
        setStyle(styleName, value)
        {
            this.e.style[styleName] = value;
        }
        /**
         * 获取样式
         * @param {string} styleName
         * @returns {string}
         */
        getStyle(styleName)
        {
            return this.e.style[styleName];
        }
        /**
         * 修改多个样式
         * @param {Object<string, string | number | Object>} obj
         */
        setStyles(obj)
        {
            forEach(Object.keys(obj), (key) =>
            {
                var value = obj[key];
                if (isAmong(typeof (value), "number", "string"))
                    this.e.style[key] = obj[key];
            });
        }

        /**
         * 修改文本
         * @param {string} text
         */
        setText(text)
        {
            this.e.innerText = text;
        }

        /**
         * 设置HTMLElement的属性
         * @param {string} attrName
         * @param {string} value
         */
        setAttr(attrName, value)
        {
            this.e[attrName] = value;
        }
        /**
         * 获取HTMLElement的属性
         * @param {string} attrName
         * @returns {string}
         */
        getAttr(attrName)
        {
            return this.e[attrName];
        }
        /**
         * 设置多个HTMLElement属性
         * @param {Object<string, string>} obj
         */
        setAttrs(obj)
        {
            forEach(Object.keys(obj), (key) => { this.e[key] = obj[key]; });
        }


        /**
         * 设置元素可见性
         * @param {"block" | "inline" | "none" | "inline-block"} s
         */
        setDisplay(s)
        {
            this.setStyle("display", s);
        }

        /**
         * 添加事件监听器
         * @param {string} eventName
         * @param {function(Event):void} callBack
         * @param {boolean | AddEventListenerOptions} options
         */
        addEventListener(eventName, callBack, options)
        {
            this.e.addEventListener(eventName, callBack, options);
        }
    }

    /**
     * 区域类
     * 管理一个dom子树
     * 
     * 不要继承此类除非你知道你在做什么
     * @extends Nelement
    */
    class Narea extends Nelement
    {
        /**
         * 管理id对应表
         * @package
         * @type {Map<string, Nelement>}
        */
        idMap = new Map();

        /**
         * @param {HTMLElement} [view]
        */
        constructor(view)
        {
            super(view ? view : document.body);
            this.setArea(this);
            this.setStyle("margin", "0");
        }

        /**
         * 通过id查找并获取元素
         * @param {string} [id]
         * @returns {Nelement}
         */
        getById(id)
        {
            return this.idMap.get(id);
        }
    }

    /**
     * 指针数据
     * 当发生鼠标或触摸事件时传递
     * 包含指针坐标和按下状态等数据
     */
    class pointerData
    {
        /**
         * 当前指针位置x
         * @type {number}
        */
        x = 0;
        /**
         * 当前指针位置y
         * @type {number}
        */
        y = 0;
        /**
         * 指针位置和上次位置的变化x
         * @type {number}
        */
        vx = 0;
        /**
         * 指针位置和上次位置的变化y
         * @type {number}
        */
        vy = 0;
        /**
         * 此指针的起始位置x
         * @type {number}
        */
        sx = 0;
        /**
         * 此指针的起始位置y
         * @type {number}
        */
        sy = 0;
        /**
         * 当前此指针是否处于按下状态
         * @type {boolean}
        */
        hold = false;
        /**
         * 当前指针是否正在按下(按下事件)
         * @type {boolean}
        */
        pressing = false;
        
        /**
         * @param {number} x
         * @param {number} y
         * @param {number} vx
         * @param {number} vy
         * @param {number} sx
         * @param {number} sy
         * @param {boolean} hold
         * @param {boolean} pressing
         */
        constructor(x, y, vx, vy, sx, sy, hold, pressing)
        {
            this.x = x;
            this.y = y;
            this.vx = vx;
            this.vy = vy;
            this.sx = sx;
            this.sy = sy;
            this.hold = hold;
            this.pressing = pressing;
        }
    }

    /**
     * 鼠标(拖拽)事件处理
     * @param {Nelement} element 绑定到元素
     * @param {function(pointerData):void} callBack 回调
     * @param {number} [button] 绑定的按键
     */
    function mouseBind(element, callBack, button = 0)
    {
        element.addEventListener("mousedown", (/** @type {MouseEvent} */ e) => mouseDown(e), false);

        var mousemoveP = (/** @type {MouseEvent} */ e) => mouseMove(e);
        var mouseupP = (/** @type {MouseEvent} */ e) => mouseUp(e);

        var x = 0, y = 0;
        var sx = 0, sy = 0;
        var leftDown = false;
        /**
         * 鼠标处理函数(按下)
         * @param {MouseEvent} e 
         */
        function mouseDown(e)
        {
            if (e.cancelable)
                e.preventDefault();
            sx = x = e.clientX;
            sy = y = e.clientY;
            window.addEventListener("mousemove", mousemoveP, true);
            window.addEventListener("mouseup", mouseupP, true);
            if (e.button == button)
            {
                leftDown = true;
                callBack(new pointerData(
                    x, y,
                    0, 0,
                    x, y,
                    true, true
                ));
            }
        }
        /**
         * 鼠标处理函数(移动)
         * @param {MouseEvent} e 
         */
        function mouseMove(e)
        {
            if (leftDown)
            {
                // e.preventDefault();
                var vx = e.clientX - x;
                var vy = e.clientY - y;
                x = e.clientX;
                y = e.clientY;
                callBack(new pointerData(
                    x, y,
                    vx, vy,
                    sx, sy,
                    true, false
                ));
            }
        }
        /**
         * 鼠标处理函数(松开)
         * @param {MouseEvent} e 
         */
        function mouseUp(e)
        {
            var vx = e.clientX - x;
            var vy = e.clientY - y;
            x = e.clientX;
            y = e.clientY;
            window.removeEventListener("mousemove", mousemoveP, false);
            window.removeEventListener("mouseup", mouseupP, false);
            if (leftDown && e.button == button)
            {
                leftDown = false;
                callBack(new pointerData(
                    x, y,
                    vx, vy,
                    sx, sy,
                    false, false
                ));
            }
        }
    }

    /**
     * 点击事件处理
     * @param {Nelement} element 绑定到元素
     * @param {function():void} callBack 回调
     */
    function clickBind(element, callBack)
    {
        element.addEventListener("click", (/** @type {MouseEvent} */ e) => callBack(), false);

    }

    /**
     * 事件绑定对应表
     */
    const bindTable = {
        mouseBind: mouseBind,
        clickBind: clickBind
    };

    /**
     * 遍历展开元素
     * @typedef {import("./EleData.if").EleData | Object<string, any>} EDObj
     * @param {EDObj} obj
     * @returns {Nelement}
    */
    function expEle(obj)
    {
        var now = new Nelement((obj.tagName ? obj.tagName : "div"), obj.id);

        forEach([
            "height",
            "width",
            "position",
            "top",
            "left",
            "right",
            "bottom",
            "display",
            "overflow"
        ], (key) =>
        {
            if (obj[key])
                now.setStyle(key, obj[key]);
        });

        if (obj.style)
            now.setStyles(obj.style);
        if (obj.text)
            now.setText(obj.text);
        if (obj.attr)
            now.setAttrs(obj.attr);
        if (obj.event) // 如果有绑定事件
        {
            forEach(Object.keys(obj.event), (key) => { bindTable[key](now, obj.event[key]); });
        }
        if (obj.child) // 若有子元素
        {
            forEach(obj.child, (o) => // 遍历
            {
                now.addChild(expEle(o));
            });
        }
        return now;
    }

    /**
     * 遍历预处理
     * @param {EDObj} obj
     * @param {Object<string, any>} def
     * @returns {EDObj}
    */
    function preC(obj, def)
    {
        /**
         * @type {EDObj}
         */
        var now = {};
        /**
         * @type {EDObj}
         */
        var nowDef = {};
        forEach(Object.keys(def), (key) => { now[key] = def[key]; });
        forEach(Object.keys(obj), (key) =>
        {
            if (key != "child")
            {
                if (key[0] == "$")
                {
                    let rKey = key.slice(1);
                    nowDef[rKey] = def[rKey];
                    now[rKey] = def[rKey] = obj[key];
                }
                else if (key.slice(-1) == "$")
                {
                    let rKey = key.slice(0, -1);
                    nowDef[rKey] = def[rKey];
                    def[rKey] = obj[key];
                }
                else
                    now[key] = obj[key];
            }
        });

        if (now.left && now.right && now.width)
            delete (now.width);
        if (now.top && now.bottom && now.height)
            delete (now.height);

        if (obj.child) // 若有子元素
        {
            /**
             * @type {Array<EDObj>}
            */
            now.child = [];
            forEach(obj.child, (o) => // 遍历
            {
                now.child.push(preC(o, def));
            });
        }
        forEach(Object.keys(nowDef), (key) => { def[key] = nowDef[key]; });
        return now;
    }

    /**
     * 展开元素
     * 将内容js对象转换为封装的HTML树
     * 请不要转换不受信任的json
     * @param {EDObj} obj
     * @returns {Nelement}
    */
    function expandElement(obj)
    {
        return expEle(preC(obj, {}));
    }

    /**
     * css生成
     */
    class cssG
    {
        /**
         * 100%减去指定值
         * @param {string} value
         * @returns {string}
         */
        static diFull(value)
        {
            return ("calc(100% - " + value + ")");
        }

        /**
         * 构建rgb或rgba颜色颜色
         * @param {number | string} r 0~255
         * @param {number | string} g 0~255
         * @param {number | string} b 0~255
         * @param {number | string} [a] 0~1
         */
        static rgb(r, g, b, a = 1)
        {
            return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
        }
    }

    /**
     * 文档模块
     */
    const docM = {
    };

    exports.Narea = Narea;
    exports.Nelement = Nelement;
    exports.cssG = cssG;
    exports.docM = docM;
    exports.expandElement = expandElement;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

}({}));
