import { chromium } from '@playwright/test'
const browser=await chromium.launch()
const page=await browser.newPage()
for(const width of [375,1440]){
 await page.setViewportSize({width,height:900})
 await page.goto('http://127.0.0.1:5174')
 await page.evaluate(()=>document.fonts.ready)
 await page.waitForTimeout(1500)
 await page.screenshot({path:`artifacts/hero-${width}.png`})
 for(const section of await page.locator('main section').all()){
  await section.scrollIntoViewIfNeeded()
  for(const element of await section.locator('[data-reveal]').all()) {await element.scrollIntoViewIfNeeded()}
 }
 await page.waitForTimeout(750)
 await page.screenshot({path:`artifacts/full-${width}.png`,fullPage:true})
}
await browser.close()
