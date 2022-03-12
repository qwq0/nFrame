/**
 * iframe标签上下文
 */
export class Ntag_iframe
{
    /**
     * @param {import("../Nelement").Nelement} nelement
     */
    constructor(nelement)
    {
        if (nelement.tagName == "iframe")
            this.nelement = nelement;
    }
}