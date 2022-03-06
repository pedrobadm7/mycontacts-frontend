/* eslint-disable camelcase */
import HttpClient from "./utils/HttpClient";

class ContactsService {
    constructor() {
        this.httpClient = new HttpClient("http://localhost:3001");
    }

    async listContacts(orderBy = "asc") {
        return this.httpClient.get(`/contacts?orderBy=${orderBy}`);
    }

    async listCategories() {
        return this.httpClient.get("/categories");
    }

    async listContactsById(id) {
        return this.httpClient.get(`/contacts/${id}`);
    }

    async createContact(contactData) {
        return this.httpClient.post("/contacts", {
            name: contactData.name,
            email: contactData.email,
            phone: contactData.phone,
            category_id: contactData.category_id,
        });
    }
}

export default new ContactsService();
