import { expect, Locator } from "@playwright/test";
import BasePage from "../../BasePage";

export default class NewProjectPage extends BasePage {
    private readonly titleField: Locator = this.page.locator('//input[@id="_aria_auto_id_0"]');
    private readonly descriptionField: Locator = this.page.locator('//textarea[@id="_combo_markdown_editor_1"]');
    private readonly createButton: Locator = this.page.locator('//button[@class="ui primary button"]');
    private readonly cancelButton: Locator = this.page.locator('//a[@class="ui cancel button"]');
    private readonly previewField: Locator = this.page.locator('//p[@dir="auto"]');
    private readonly previewButton: Locator = this.page.locator('//span[@data-text="Preview"]');
    private readonly templateDropdown: Locator = this.page.locator('//div[@aria-controls="_aria_auto_id_12"]');
    private readonly previewDropdown: Locator = this.page.locator('//div[@aria-controls="_aria_auto_id_16"]');


    async cancelCreation() {
        await this.cancelButton.click();
    }

    async enterTitle(title: string) {
        await this.titleField.fill(title);
    }

    async enterDescription(desc: string) {
        await this.descriptionField.fill(desc);
    }

     async clickCreateButton() {
        await this.createButton.click();
    }

    async createProjectWithATitle(title: string) {
        await this.titleField.fill(title);
        await this.createButton.click();
    }

    async createProjectWithATitleDescription(title: string, desc: string) {
        await this.titleField.fill(title);
        await this.descriptionField.fill(desc);
        await this.createButton.click();
    }

    async verifyValidationMessageisShown() {
        await expect(this.titleField).toHaveJSProperty('validationMessage', 'Please fill out this field.');
    }

    async verifyPreviewText(desc: string) {
        await this.previewButton.click();
        await expect(this.previewField).toHaveText(desc);
    }

    async selectTemplate(temp: string) {
        await this.templateDropdown.click();
        await this.page.locator('//div[@role="option"]', { hasText: `${temp}` }).click();
    }

    async selectPreview(temp: string) {
        await this.previewDropdown.click();
        await this.page.locator('//div[@role="option"]', { hasText: `${temp}` }).click();
    }
}