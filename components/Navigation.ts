import { Page, Locator } from "@playwright/test";

export default class Navigation {

    private readonly PARENT_SELECTOR: string = ".header-menu .top-menu";

    constructor(private page: Page) { }

    public getNavigationItem(name: string): Locator {
        return this.page.locator(`${this.PARENT_SELECTOR} > li > a`, { hasText: name });
    }

    public async clickNavigationItem(name: string): Promise<void> {
        const item = this.getNavigationItem(name);
        return await item.click();
    }

    public async hoverNavigationItem(name: string): Promise<void> {
        const item = this.getNavigationItem(name);
        return await item.hover();
    }

    public isSublistVisible(name: string): Promise<boolean> {
        const li = this.page.locator(`${this.PARENT_SELECTOR} > li`, {
            has: this.page.locator('a', { hasText: name })
        });
        return li.locator('.sublist.firstLevel').isVisible();
    }

    public getSublistItem(name: string): Locator {
        return this.page.locator(`${this.PARENT_SELECTOR} .sublist.firstLevel > li > a`, { hasText: name });
    }

    public async clickSublistItem(name: string): Promise<void> {
        const item = this.getSublistItem(name);
        return await item.click();
    }
}
