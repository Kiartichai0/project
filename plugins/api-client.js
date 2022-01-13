export default (context , inject) => {

    inject('api',api);
    context.$api = api;

}

const api = {
    getDate() {
        return fetch('/api/date');
    }
}

