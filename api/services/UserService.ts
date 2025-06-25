import { APIRequestContext } from "@playwright/test";

export default class UserService {

    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async createUser(token: string, username: string, email: string, password: string,) {
        const response = await this.request.post('http://localhost:3000/api/v1/admin/users', {
        data: {
            created_at: "2025-06-16T16:38:42.041Z",
            email: `${email}`,
            full_name: "Autotest",
            login_name: "test",
            must_change_password: false,
            password: `${password}`,
            restricted: true,
            send_notify: true,
            source_id: 0,
            username: `${username}`,
            visibility: "public"
                    },
                    headers: {
                        'Authorization': `token ${token}`
                    }
                });
        return response;
    }
}