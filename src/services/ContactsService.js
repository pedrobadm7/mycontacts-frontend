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

    async createContact({ name, email, phone, category_id }) {
        return this.httpClient.post("/contacts", {
            name,
            email,
            phone,
            category_id,
        });
    }
}

export default new ContactsService();
