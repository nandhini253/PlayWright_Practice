import {test, expect,Page} from '@playwright/test'
let page :Page;
test.beforeAll("Launching the URL",async({browser})=>{
    page= await browser.newPage();
   page.goto("https://www.demoblaze.com/");


})
test.afterAll("Closing the browser",async()=>
{
    await page.close();
})
test.beforeEach("Login",async()=>
{
await page.locator("#login2").click();
await page.locator("#loginusername").fill("crazy_Nan");
await page.locator("#loginpassword").fill("Act123");
await page.getByRole('button', { name: 'Log in' }).click();
await page.waitForTimeout(5000);
const userNamePrint=await page.locator("#nameofuser").innerText();
await expect(userNamePrint).toBe("Welcome crazy_Nan");
})

test.afterEach("Logout", async()=>{
await page.locator("#logout2").click();
await page.waitForTimeout(5000);

})

test("Add to cart",async()=>{
   await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();
   //await expect(page.getByText('Samsung galaxy s6').innerText()).toContain("Samsung galaxy s6");
   
   page.on('dialog',async(dialog)=>
{
    expect(dialog.message()).toContain("Product added.");
await dialog.accept();
})
await page.waitForTimeout(3000);
await page.getByRole('link',{name:'Add to cart'}).click();
})