import Service from './index';

export default class FormManagement {
    static async getForm(id) {
        return Service.get(`/form/company-details/${id}`).then(response => {
            return response.data;
        });
    }

    static async getFormData(id) {
        return Service.get(`/get-form/company-details-data/${id}`).then(
            response => {
                return response.data;
            }
        );
    }
}
