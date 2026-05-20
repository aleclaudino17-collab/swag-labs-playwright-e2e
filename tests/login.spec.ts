import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import userData from '../data/user-data.json';

test.describe('Login - Data Driven Tests', () => {
  for (const user of userData.users) {
    test(`${user.description} [${user.username}]`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.login(user.username, user.password);

      if (user.expectedResult === 'success') {
        await loginPage.expectLoginSuccess();
      } else if (user.expectedResult === 'locked') {
        await loginPage.expectLockedOutError();
      }
    });
  }

  test('Login com credenciais inválidas', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('usuario_invalido', 'senha_errada');
    await loginPage.expectInvalidCredentialsError();
  });
});
