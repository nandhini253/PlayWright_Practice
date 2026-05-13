import {test, expect,Locator} from '@playwright/test'

// test("should load homepagen with correct tittle",async({page}) => {

// await page.goto("https://katalon-demo-cura.herokuapp.com/")

// await expect(page).toHaveTitle("CURA Healthcare Service")

// await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service")

// await page.getByRole("link")
// //await expect(page.locator("//a")).toHaveText("Make Appointment").
// })

test.only("Verify the Locators of page", async({page})=>
{
    //launching URL
  await  page.goto("https://demo.nopcommerce.com/")
  const logo:Locator=  page.getByAltText("nopCommerce demo store")
    await expect(logo).toBeVisible();

//getbyText
await expect (page.getByText("Welcome to our store")).toBeVisible();
//getByPlaceholder
 await page.getByPlaceholder("Search store").fill("MacBook");
 await page.getByRole('button',{name:'Search'}).click();

//getBYROLE
await page.getByRole('link',{name:'Register'}).click();
await expect(page.getByRole('heading',{name:'Register'})).toBeVisible();
await page.getByRole('textbox',{name:'FirstName'}).fill("Nandhini");

})