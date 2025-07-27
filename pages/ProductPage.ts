import { Page, Locator } from '@playwright/test';

export default class ProductPage {
  constructor(private page: Page) { }

  public getPageTitle(): Locator {
    return this.page.locator(".page-title h1")
  }
}
