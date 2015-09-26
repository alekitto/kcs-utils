/**
 * The cookie accessor interface
 * @typedef {object} CookieAccessor
 */

/**
 * Gets an item from the document cookie.
 * If the item exists it is returned as a string.
 * Null is returned if the item is not present.
 * No exception will be thrown.
 *
 * @name CookieAccessor.getItem
 * @function
 * @param {string}                      - sKey The cookie key
 * @return {null|string}                - The requested item
 */

/**
 * Sets a cookie in the browser store
 *
 * @name CookieAccessor.setItem
 * @function
 * @param {String} sKey                 - The cookie key
 * @param {String} sValue               - The new cookie value
 * @param {Number|String|Date} [vEnd]   - The cookie expiration [default: null - Expires with the browser session]
 * @param {String} [sPath]              - The cookie validity path [default: current path]
 * @param {String} [sDomain]            - The cookie domain [default: current domain]
 * @param {Boolean} [bSecure=false]     - HTTPS only cookie
 *
 * @throws InvalidArgumentException
 */

;
var undefined;
define('cookie-consent', ['utils/extender', 'doc-cookies'], function(extender, cookies) {

    var extend = extender.extend;

    /**
     * CookieConsent holds informations about the allowance
     * of cookie installation for this site, and the
     * opt'd-out functionalities.
     * It uses a permanent technical cookie to persist these
     * informations as suggested in the EU cookie law
     *
     * @param {Object=} options The options for information persistance:
     *                          * cookieName - set the persistent first-party cookie name [default: cconsent]
     *                          * domain - target domain [defaults to current domain]
     *                          * secure - HTTPS only [default: false]
     * @returns {CookieConsent}
     * @constructor
     */
    var CookieConsent = function (options) {
        /**
         * Acceptance key/value pairs
         *
         * @member {{shortAccepted: boolean, youtube: undefined, social: undefined}}
         */
        this.consent = {
            shortAccepted: false,
            youtube: undefined,
            social: undefined,
            version: 1432764453
        };

        /**
         * Instance options:
         *   - cookieName: The preferences' persistence cookie name
         *   - domain: Cookie domain
         *   - secure: HTTPS only
         *
         * @type {{cookieName: string, domain: undefined, secure: boolean}}
         */
        this.options = {
            cookieName: 'cconsent',
            domain: undefined,
            secure: false
        };

        this.init(options);
        return this;
    };

    /**
     * Initialize the object
     *
     * @param options
     * @private
     */
    CookieConsent.prototype.init = function(options) {
        this.options = extend({}, this.options, options);

        var consentString = cookies.getItem(this.options.cookieName);
        this.consent = extend({}, this.consent, JSON.parse(consentString));
    };

    /**
     * Returns if a key is present in the consent object and its value is not undefined
     *
     * @param key
     * @public
     * @return {boolean}
     */
    CookieConsent.prototype.has = function (key) {
        return (key in this.consent && this.consent[key] !== undefined);
    };

    /**
     * Get the value for the specified key.
     * Returns false if not set
     *
     * @param key
     * @public
     * @returns {boolean}
     */
    CookieConsent.prototype.get = function (key) {
        if (key in this.consent) {
            return (this.consent[key] === undefined) ? false : this.consent[key];
        }

        return false;
    };

    /**
     * Set a value in the persistent store and stores the cookie.
     *
     * @param key
     * @param value
     * @returns {CookieConsent}
     */
    CookieConsent.prototype.set = function (key, value) {
        this.consent[key] = value;
        this.save();

        return this;
    };

    /**
     * Serialize the consent object and store in the persistent cookie
     * @returns {CookieConsent}
     */
    CookieConsent.prototype.save = function () {
        var serialized = JSON.stringify(this.consent);

        var expiration = moment().add(12, 'months');
        cookies.setItem(this.options.cookieName, serialized, expiration.toDate(),
            '/', this.options.domain, this.options.secure);
        return this;
    };

    /**
     * Accept all
     *
     * @return {CookieConsent}
     */
    CookieConsent.prototype.acceptAll = function() {
        this.consent = {
            shortAccepted: true,
            youtube: true,
            social: true
        };

        this.save();
        return this;
    };

    return {
        create: function(options) {
            return new CookieConsent(options);
        }
    };
});
