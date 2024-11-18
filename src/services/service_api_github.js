export default class ApiGitHub {
    constructor($http) {
        this.$http = $http;
    }

    /**
     * Get demo path from github
     * @param {String} key - Widget key
     * @returns {String} - github demo path
     */
    getDemoPath(key) {
        return `./demo/bj_${key}/index.html`;
    }
}

ApiGitHub.$inject = ['$http'];