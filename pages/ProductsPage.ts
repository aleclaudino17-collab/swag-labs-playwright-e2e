import { Page, Locator, expect } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly productTitle: Locator;
  readonly inventoryList: Locator;
  readonly addToCartButtons: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly productSortDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productTitle = page.locator('[data-test="title"]');
    this.inventoryList = page.locator('[data-test="inventory-list"]');
    this.addToCartButtons = page.locator('[data-test^="add-to-cart"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.productSortDropdown = page.locator('[data-test="product-sort-container"]');
  }

  async expectPageLoaded(): Promise<void> {
    await expect(this.productTitle).toHaveText('Products');
    await expect(this.inventoryList).toBeVisible();
  }

  async addProductToCart(productName: string): Promise<void> {
    const button = this.page.locator(`[data-test="add-to-cart-${productName.toLowerCase().replace(/\s+/g, '-')}"]`);
    await button.click();
  }

  async addFirstProductToCart(): Promise<void> {
    await this.addToCartButtons.first().click();
  }

  async getCartCount(): Promise<string | null> {
    return await this.cartBadge.textContent();
  }

  async goToCart(): Promise<void> {
    await this.cartLink.click();
  }

  async sortProductsBy(optionValue: string): Promise<void> {
    await this.productSortDropdown.selectOption(optionValue);
  }
}
