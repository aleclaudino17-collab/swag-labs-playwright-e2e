import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('E2E - Fluxo Completo de Compra', () => {
  test('Deve realizar uma compra completa com sucesso', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Act - Login
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.expectLoginSuccess();

    // Assert - Página de Produtos
    await productsPage.expectPageLoaded();

    // Act - Adicionar produto ao carrinho
    await productsPage.addFirstProductToCart();
    const cartCount = await productsPage.getCartCount();
    expect(cartCount).toBe('1');

    // Act - Ir para o carrinho
    await productsPage.goToCart();

    // Assert - Carrinho
    await cartPage.expectPageLoaded();
    await cartPage.expectItemCount(1);

    // Act - Checkout
    await cartPage.proceedToCheckout();

    // Act - Preencher dados de envio
    await checkoutPage.fillShippingInformation('João', 'Silva', '12345-678');

    // Assert - Overview do checkout
    await checkoutPage.expectCheckoutOverview();

    // Act - Finalizar compra
    await checkoutPage.finishOrder();

    // Assert - Confirmação
    await checkoutPage.expectOrderComplete();

    // Act - Voltar para produtos
    await checkoutPage.goBackToProducts();
    await productsPage.expectPageLoaded();
  });

  test('Deve adicionar múltiplos produtos e finalizar compra', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await productsPage.expectPageLoaded();

    // Adicionar 3 produtos
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.addProductToCart('Sauce Labs Bike Light');
    await productsPage.addProductToCart('Sauce Labs Bolt T-Shirt');

    const cartCount = await productsPage.getCartCount();
    expect(cartCount).toBe('3');

    await productsPage.goToCart();
    await cartPage.expectItemCount(3);
    await cartPage.proceedToCheckout();

    await checkoutPage.fillShippingInformation('Maria', 'Oliveira', '98765-432');
    await checkoutPage.expectCheckoutOverview();
    await checkoutPage.finishOrder();
    await checkoutPage.expectOrderComplete();
  });
});
