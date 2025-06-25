import { expect, Locator } from "@playwright/test";
import BasePage from "../../BasePage";

export default class ProjectPage extends BasePage {
    private readonly newProjectButton: Locator = this.page.locator('//a[@class="ui small primary button"]');
    private readonly editProjectButton: Locator = this.page.locator('//a[@class="flex-text-inline"]',  { hasText: ' Edit' });
    private readonly deleteProjectButton: Locator = this.page.locator('//a[@class="delete-button flex-text-inline"]');
    projectLink: Locator = this.page.locator('//a[@class="muted tw-break-anywhere"]');
    private readonly descriptionField: Locator = this.page.locator('//p[@dir="auto"]');
   
     async openPage(userName: string) {
        await this.page.goto(`/${userName}/-/projects`);
    }

    async clickNewProject() {
        await this.newProjectButton.click();
    }

    async clickDeleteProject() {
        await this.deleteProjectButton.click();
    }

    async clickEditProject() {
        await this.editProjectButton.click();
    }

    async checkProjectIsCreated(selectedTitle: string) {
        await expect(this.projectLink).toHaveText(selectedTitle)
    }


    async checkProjectIsDeleted() {
        await expect(this.projectLink).toBeHidden()
    }

    async chekDescription(selectedDesc: string) {
        await expect(this.descriptionField).toHaveText(selectedDesc)
    }
}