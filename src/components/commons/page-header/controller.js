export default class PageHeaderController {
    constructor($translate, Storage) {
        this.$translate = $translate;
        this.Storage = Storage;
        this.PageData = {
            seletedLang: this.$translate.preferredLanguage()
        };
    }

    onUserChangeLanguage(lang) {
        this.PageData.seletedLang = lang;
        this.$translate.use(this.PageData.seletedLang);
        this.Storage.set('BJ_Lang', this.PageData.seletedLang);
    }
}

PageHeaderController.$inject = ['$translate', 'Storage'];