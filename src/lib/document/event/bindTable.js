import { mouseBind } from "../event/mouse.js";
import { clickBind } from "./click.js";

/**
 * 事件绑定对应表
 */
export const bindTable = {
    mouseBind: mouseBind,
    clickBind: clickBind
};