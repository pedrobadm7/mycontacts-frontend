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

    async listContactsById(contactId) {
        return this.httpClient.get(`/contacts/${contactId}`);
    }

    async createContact(contactData) {
        return this.httpClient.post("/contacts", {
            name: contactData.name,
            email: contactData.email,
            phone: contactData.phone,
            category_id: contactData.category_id,
        });
    }

    async updateContact(contactData, contactId) {
        return this.httpClient.put(`/contacts/${contactId}`, {
            name: contactData.name,
            email: contactData.email,
            phone: contactData.phone,
            category_id: contactData.category_id,
        });
    }
}

export default new ContactsService();
