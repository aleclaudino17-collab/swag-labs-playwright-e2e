import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartTitle: Locator;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly removeButtons: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartTitle = page.locator('[data-test="title"]');
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.removeButtons = page.locator('[data-test^="remove"]');
  }

  async expectPageLoaded(): Promise<void> {
    await expect(this.cartTitle).toHaveText('Your Cart');
    await expect(this.cartItems.first()).toBeVisible();
  }

  async expectItemCount(count: number): Promise<void> {
    if (count === 0) {
      await expect(this.cartItems).toHaveCount(0);
    } else {
      await expect(this.cartItems).toHaveCount(count);
    }
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async removeFirstItem(): Promise<void> {
    await this.removeButtons.first().click();
  }
}
