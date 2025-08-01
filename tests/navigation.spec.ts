import { test, expect } from '@playwright/test';

import Navigation from '../components/Navigation';
import ProductPage from '../pages/ProductPage';

test.describe('Navigation Component', () => {
  let navigation: Navigation;
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    navigation = new Navigation(page);
    productPage = new ProductPage(page);
    await page.goto('/');
  });


  test('should navigate to the product page when clicking on the product link', async () => {
    const navigationItems = ["Books", "Computers", "Electronics", "Apparel & Shoes", "Digital downloads", "Jewelry", "Gift Cards"];
    for (const item of navigationItems) {
      await navigation.clickNavigationItem(item);
      const pageTitle = await productPage.getPageTitle().textContent();
      expect(pageTitle).toContain(item);
    }
  });

  test('should navigate to the sublist item when hovering on it', async () => {
    const data = [
      { item: "Computers", subItems: ["Desktops", "Notebooks", "Accessories"] },
      { item: "Electronics", subItems: ["Camera, photo", "Cell phones"] },
    ];

    for (const { item, subItems } of data) {
      for (const subItem of subItems) {
        await navigation.hoverNavigationItem(item);
        const isVisible = await navigation.isSublistVisible(item);
        expect(isVisible).toBeTruthy();
        await navigation.clickSublistItem(subItem);
        const pageTitle = await productPage.getPageTitle().textContent();
        expect(pageTitle).toContain(subItem);
      }
    }
  });
});