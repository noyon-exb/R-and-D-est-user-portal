import Service from './index';

const DEMO_SEARCH_PATH = '/';

export default class DemoManagement {
    static async demoApiCallFunction1(page = 0, size = 10) {
        const params = new URLSearchParams({
            page: page,
            size: size,
        }).toString();

        return Service.get(`${DEMO_SEARCH_PATH}/list?${params}`, {}).then(
            response => response.data
        );
    }

    static async demoApiCallFunction2(payload) {
        return Service.post(`${DEMO_SEARCH_PATH}/add`, payload).then(
            response => response.data
        );
    }
}
