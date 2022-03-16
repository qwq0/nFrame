import { Nelement } from "./Nelement.js";
import { Ntag_iframe } from "./tags/iframe.js";

/**
 * 新建标签上下文
 * @namespace
 */
export const Ntag = {
    /**
     * 新建iframe标签上下文
     * @param {Nelement} o
     * @returns {Ntag_iframe}
    */
    iframe: (o) => (new Ntag_iframe(o))
};