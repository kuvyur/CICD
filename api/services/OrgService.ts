import { APIRequestContext } from "@playwright/test";

export default class OrgService {

    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async getAllOrgs() {
        const response = await this.request.get('http://localhost:3000/api/v1/orgs', {
        });
        return response;
    }

    async createNewOrg(token: string, name: string) {
        const response = await this.request.post('http://localhost:3000/api/v1/orgs', {
                    data: {
                        description: "123",
                        email: "123321@test.com",
                        full_name: "ajdsnjkda",
                        location: "sDASD",
                        repo_admin_change_team_access: true,
                        username: `${name}`,
                        visibility: "public",
                        website: "https://www.google.com/"
                        
        
                    },
                    headers: {
                        'Authorization': `token ${token}`
                    }
                });
        
        return response;
    }

    async getOrg(name: string) {
        const response = await this.request.get(`http://localhost:3000/api/v1/orgs/${name}`, {
        });

        return response;
    }

    async deleteOrg(token: string, name: string) {
        const response = await this.request.delete(`http://localhost:3000/api/v1/orgs/${name}`, {
                    headers: {
                        'Authorization': `token ${token}`
                    }
                });

        return response;
    }

    async editOrg(token: string, name: string, newdescription: string) {
        const response = await this.request.patch(`http://localhost:3000/api/v1/orgs/${name}`, {
            data: {
                        description: `${newdescription}`,
                        email: "123321@test.com",
                        full_name: "ajdsnjkda",
                        location: "sDASD",
                        repo_admin_change_team_access: true,
                        username: `${name}`,
                        visibility: "public",
                        website: "https://www.google.com/"
                        
        
                    },
                    headers: {
                        'Authorization': `token ${token}`
                    }
        });
        
        return response;
    }

    async createOrgSecret(token: string, orgName: string, secretName: string) {
        const response = await this.request.put(`http://localhost:3000/api/v1/orgs/${orgName}/actions/secrets/${secretName}`, {
                    data: {
                        data: "autotest"
                    },
                    headers: {
                        'Authorization': `token ${token}`
                    }
                });
        
        return response;
    }

    async deleteOrgSecret(token: string, orgName: string, secretName: string) {
        const response = await this.request.delete(`http://localhost:3000/api/v1/orgs/${orgName}/actions/secrets/${secretName}`, {
                    headers: {
                        'Authorization': `token ${token}`
                    }
                });
        
        return response;
    }
}