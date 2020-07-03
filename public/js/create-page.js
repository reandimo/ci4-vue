let createPage = (name, data = {}, methods = {}, updated = () => {}) => Vue.component('page-' + name, {
    data: () => Object.assign({ content: 'Loading...'}, data),
    methods: methods,
    mounted () {
        (new Promise( (resolve) => {
            fetch(
                this.$route.path,
                {
                    method: 'GET',
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                    }
                }
            ).then(response =>  resolve(response.text()));
        })).then(result => this.content = result);
    },
    render : function (c) {
        return c(Vue.compile('<div>' + this.content + '</div>'));
    },
    updated: updated
});

export default createPage;