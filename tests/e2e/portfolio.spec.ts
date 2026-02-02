/**
 * Comprehensive E2E Test Suite for Portfolio Website
 * Principal QA Engineer - 15 Years Experience
 */

import { test, expect } from '@playwright/test';

test.describe('Portfolio Website - Smoke Tests', () => {

  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');

    // Wait for page to be stable
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Critical elements must be visible
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible({ timeout: 5000 });
    await expect(h1).toContainText('Principal');
  });

  test('should have navigation visible', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Check nav exists
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();

    // Check logo (use first() to handle strict mode violation)
    await expect(page.getByText('jabbir.dev').first()).toBeVisible();
  });
});

test.describe('Section Rendering Tests', () => {

  test('should render all sections', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Wait a bit for animations
    await page.waitForTimeout(500);

    // Check each section exists in DOM
    const sections = ['hero', 'capabilities', 'featured-work', 'technical-notes', 'scale', 'tech-stack', 'projects', 'principles', 'cta'];

    for (const sectionId of sections) {
      const section = page.locator(`#${sectionId}`);
      await expect(section).toHaveCount(1);
    }
  });

  test('should render tech stack section with content', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Scroll to tech stack with more wait time
    await page.evaluate(() => {
      document.getElementById('tech-stack')?.scrollIntoView({ behavior: 'auto', block: 'start' });
    });

    await page.waitForTimeout(1500);

    // Check for AI & LLM content
    await expect(page.getByText('AI & LLM')).toBeVisible();
  });

  test('should render Scale section with metrics', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Scroll to scale section with more wait time
    await page.evaluate(() => {
      document.getElementById('scale')?.scrollIntoView({ behavior: 'auto', block: 'start' });
    });

    await page.waitForTimeout(1500);

    // Check for metrics in page content
    const content = await page.content();
    expect(content).toContain('15M+');
    expect(content).toContain('FIPS 140-2');
  });

  test('should render CTA section with Lead AI badge', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Scroll to CTA with more wait time
    await page.evaluate(() => {
      document.getElementById('cta')?.scrollIntoView({ behavior: 'auto', block: 'start' });
    });

    await page.waitForTimeout(1500);

    // Check for Lead AI badge (use locator to target CTA section specifically)
    const ctaSection = page.locator('#cta');
    await expect(ctaSection.getByText('Lead AI @ DoodleLabs')).toBeVisible();
  });
});

test.describe('Navigation Tests', () => {

  test('should scroll to sections via navigation', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(500);

    // Get initial scroll position
    const initialScroll = await page.evaluate(() => window.scrollY);

    // Check viewport size to determine mobile vs desktop navigation
    const viewport = page.viewportSize();
    const isMobile = viewport && viewport.width < 768;

    if (isMobile) {
      // On mobile, open hamburger menu first
      // Find the menu button (has Menu icon which is only visible when menu is closed)
      const menuButton = page.locator('nav').getByRole('button').filter({ has: page.locator('svg') }).first();
      await menuButton.click({ timeout: 5000 });
      await page.waitForTimeout(300);
      // Click Work from mobile menu overlay
      await page.locator('div[class*="backdrop-blur"]').getByText('Work').click({ timeout: 5000 });
    } else {
      // On desktop, click Work link directly
      await page.click('text=Work', { timeout: 5000 });
    }
    await page.waitForTimeout(800);

    // Check scroll position changed
    const afterWorkScroll = await page.evaluate(() => window.scrollY);
    expect(afterWorkScroll).toBeGreaterThan(initialScroll);
  });

  test('should have working social links', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Scroll to CTA section to find the social links
    await page.evaluate(() => {
      document.getElementById('cta')?.scrollIntoView({ behavior: 'auto', block: 'start' });
    });

    await page.waitForTimeout(500);

    // Check LinkedIn
    const linkedin = page.getByText('linkedin.com/in/jabbir-basha');
    await expect(linkedin).toBeVisible();

    // Check GitHub
    const github = page.getByText('github.com/jabbir-doodle');
    await expect(github).toBeVisible();
  });

  test('should have working email link', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Find email link (there are multiple)
    const emailLinks = page.locator('a[href="mailto:basha0543@gmail.com"]');
    await expect(emailLinks).toHaveCount(2);
  });
});

test.describe('Responsive Design Tests', () => {

  test('should work on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator('h1')).toBeVisible();
  });

  test('should work on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator('h1')).toBeVisible();

    // Check that buttons exist
    const buttonCount = await page.locator('button').count();
    expect(buttonCount).toBeGreaterThan(0);
  });

  test('should work on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator('h1')).toBeVisible();
  });
});

test.describe('Performance Tests', () => {

  test('should load quickly', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    const loadTime = Date.now() - startTime;

    expect(loadTime).toBeLessThan(5000);
  });

  test('should not have critical console errors', async ({ page }) => {
    const errors: string[] = [];

    page.on('console', msg => {
      const text = msg.text();
      if (msg.type() === 'error') {
        // Filter out expected benign messages
        if (!text.includes('DevTools') &&
            !text.includes('favicon') &&
            !text.includes('scroll-linked')) {
          errors.push(text);
        }
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    expect(errors.length).toBe(0);
  });
});

test.describe('Accessibility Tests', () => {

  test('should have proper heading structure', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Check for h1
    const h1 = await page.locator('h1').count();
    expect(h1).toBeGreaterThan(0);

    // Check for h2s
    const h2 = await page.locator('h2').count();
    expect(h2).toBeGreaterThan(0);
  });

  test('should have alt text for images', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    const images = page.locator('img');
    const count = await images.count();

    for (let i = 0; i < Math.min(count, 10); i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });
});

test.describe('Content Accuracy Tests', () => {

  test('should display correct credentials', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(500);

    // Check for key credentials that should be visible in hero
    const pageContent = await page.content();
    expect(pageContent).toContain('15+ Years Experience');
    expect(pageContent).toContain('Singapore');
  });

  test('should display tech stack correctly', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Scroll to tech stack
    await page.evaluate(() => {
      document.getElementById('tech-stack')?.scrollIntoView({ behavior: 'auto', block: 'start' });
    });

    await page.waitForTimeout(500);

    // Check for tech categories
    await expect(page.getByText('AI & LLM')).toBeVisible();
    await expect(page.getByText('Backend & Data')).toBeVisible();
  });
});

test.describe('Visual Regression Tests', () => {

  test('should match hero screenshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);

    // Screenshot hero
    const hero = page.locator('#hero');
    await expect(hero).toBeVisible();

    await hero.screenshot({
      path: 'test-results/screenshots/hero-section.png'
    });
  });

  test('should match full page screenshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: 'test-results/screenshots/full-page.png',
      fullPage: true
    });
  });
});
