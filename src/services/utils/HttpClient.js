import delay from "../../utils/delay";
import APIError from "../../errors/APIError";

class HttpClient {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async get(path) {
        await delay(500);

        const response = await fetch(`${this.baseURL}${path}`);

        let body = null;
        const contentType = response.headers.get("Content-Type");
        if (contentType.includes("application/json")) {
            body = await response.json();
        }

        if (response.ok) {
            return body;
        }

        throw new APIError(response, body);
    }

    async post(path, body) {
        const response = await fetch(`${this.baseURL}${path}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        let responseBody = null;
        const contentType = response.headers.get("Content-Type");
        if (contentType.includes("application/json")) {
            responseBody = await response.json();
        }

        if (response.ok) {
            return body;
        }

        throw new APIError(response, responseBody);
    }

    async put(path, body) {
        const response = await fetch(`${this.baseURL}${path}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        let responseBody = null;
        const contentType = response.headers.get("Content-Type");
        if (contentType.includes("application/json")) {
            responseBody = await response.json();
        }

        if (response.ok) {
            return responseBody;
        }

        throw new APIError(response, responseBody);
    }

    async delete(path) {
        const response = await fetch(`${this.baseURL}${path}`, {
            method: "DELETE",
        });

        if (response.ok) {
            return;
        }

        throw new APIError(response);
    }
}

export default HttpClient;
