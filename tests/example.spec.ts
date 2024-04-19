import { test, expect } from '@playwright/test';





test('test', async ({ page }) => {
  await page.goto('https://www.nintendo.com/en-gb/Search/Search-299117.html?f=147394-5-81');

  await page.locator('#onetrust-accept-btn-handler').click()
  
  await page.locator('//*[@id="VA_MainSearch"]/div[1]/div[3]/div[2]/div/label/select').selectOption({value:'147485'})
  await page.waitForTimeout(3300)
  const spanLocator = page.locator('span.page-title-text');
  await spanLocator.last().waitFor();
  const count = await spanLocator.count()
  for (let i = 0; i < count ; i++){
    const text= await spanLocator.nth(i).textContent()
    console.log(text);
  
  };

  const data = await page.locator('p.page-data').elementHandles()
  console.log(data.length)
//   await Promise.all(data.map(async el => {

//     const text = await el.textContent();
//     const dateRegex = /\d{2}\/\d{2}\/\d{4}/; // Regular expression to match date in the format DD/MM/YYYY
//     const match = text?.match(dateRegex); // Attempt to match the date format
//     console.log(match);
// }));

  for( let i = 0 ; i < data.length-1; i ++ ){
    const text = await data[i].textContent()
    // console.log(text)
    const dateRegex = /\d{2}\/\d{2}\/\d{4}/; // Regular expression to match date in the format DD/MM/YYYY
    const match1 = text?.match(dateRegex); // Attempt to match the date format
    if (match1 == null){
      continue
    }
      
    const text1 = await data[i+1].textContent()
    
    const match2 = text1?.match(dateRegex); // Attempt to match the date format

    console.log(match1 + ":" + match2+"hello");
    if (match2 == null){
      continue
    }
    const m1= match1[0].split("/")
    const m2 = match2[0].split("/")
    const date1 = new Date(Number(m1[2]),Number(m1[1]),Number(m1[0]))
    const date2 = new Date(Number(m2[2]),Number(m2[1]),Number(m2[0]))
    console.log(date1.getTime())
    console.log(date2.getTime())
    console.log(date1)
    console.log(date2)
    expect(date1.getMinutes()).toBeLessThanOrEqual(date2.getMinutes())
  }
  await page.getByText(' Nintendo eShop ').first().click()
  await page.waitForLoadState('load')
  const image = await page.locator('[data-res="unchanged-image1600w"]').first();
  await image.waitFor()
  expect(image).toBeVisible()
  
  // for (let i =0 ; i < locatorCount - 1; i++){
  //   const el1= await page.locator('//*[@id="ResultsTableContent"]/tr').nth(i)
  //   console.log(el1.allInnerTexts())
  //   const el2= await page.locator('//*[@id="ResultsTableContent"]/tr').nth(i+1)
  // }
});

