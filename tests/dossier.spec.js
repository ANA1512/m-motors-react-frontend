import { test, expect } from '@playwright/test'

test('création de dossier après login', async ({ page }) => {
  // 1. Aller sur la page d'accueil (c'est là que sont les véhicules)
  await page.goto('http://localhost:5173/')

  // 2. Attendre que les véhicules chargent
  await page.waitForSelector('a:has-text("Voir le détail")', { timeout: 10000 })

  // 3. Cliquer sur "Voir le détail" du premier véhicule
  await page.click('a:has-text("Voir le détail")')

  // 4. Ajouter au panier
  await page.waitForSelector('button:has-text("Ajouter au panier")', { timeout: 10000 })
  await page.click('button:has-text("Ajouter au panier")')

  // 5. Aller au panier
  await page.goto('http://localhost:5173/cart')

  // 6. Cliquer sur "Créer un dossier"
  await page.waitForSelector('button:has-text("Créer un dossier")', { timeout: 10000 })
  await page.click('button:has-text("Créer un dossier")')

  // 7. On arrive sur login car pas connecté
  await expect(page).toHaveURL('http://localhost:5173/login')

  // 8. Se connecter
  await page.fill('input[name="email"]', 'test234@gmail.com')
  await page.fill('input[name="password"]', '98765')
  await page.click('button[type="submit"]')

  // 9. On arrive sur moncompte
  await expect(page).toHaveURL('http://localhost:5173/moncompte')
})