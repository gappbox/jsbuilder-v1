export default class LocalStorage {
    /**
     * LocalStorage
     * @constructor
     * @param {Object} $window - Global object
     */
    constructor($window) {
        this.$window = $window;
    }

    /**
     * Has item in localstorage
     * @param {String} key
     * @return {Any}
     */
    has(key) {
        return this.$window.localStorage.getItem(key);
    }

    /**
     * Get item from localstorage
     * @param {String} key
     * @return {Any}
     */
    get(key) {
        return JSON.parse(this.$window.localStorage.getItem(key));
    }

    /**
     * Set item to localstorage
     * @param {String} key
     * @param {Any} value
     */
    set(key, value) {
        this.$window.localStorage.setItem(key, JSON.stringify(value));
    }

    /**
     * Remove item from localstorage
     * @param {String} key
     */
    remove(key) {
        this.$window.localStorage.removeItem(key);
    }
}

LocalStorage.$inject = ['$window'];