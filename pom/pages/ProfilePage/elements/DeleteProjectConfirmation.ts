import { expect, Locator } from "@playwright/test";
import BasePage from "../../../BasePage";

export default class DeleteProjectConfirmation extends BasePage {
    private readonly noButton: Locator = this.page.locator('//button[@class="ui cancel button"]', { hasText: ' No' });
    private readonly yesButton: Locator = this.page.locator('//button[@class="ui primary ok button"]');

    async confirmDeletion() {
        await this.yesButton.click();
    }

    async cancelDeletion() {
        await this.noButton.click();
    }
}