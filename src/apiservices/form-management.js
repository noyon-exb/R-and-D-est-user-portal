import Service from './index';

export default class FormManagement {
    static async getForm() {
        return Service.get(`/form/company-details`).then(
            response => response.data
        );
    }

    static async getFormData() {
        return Service.get(`/get-form/company-details-data`).then(
            response => response.data
        );
    }
}
