import {test,Locator,expect } from "@playwright/test"
test("Verify the Orange", async({page})=>{
     await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
await page.getByPlaceholder("Username").fill("Admin");
await page.getByPlaceholder("Password").fill("admin123");
await page.getByRole('button', { name: 'Login' }).click();

await page.getByText('PIM').click();

await page.locator('form i').nth(2).click();

await page.waitForTimeout(5000);

const options:Locator=await page.locator("div[role='listbox'] span");
const count:number=await options.count();

for (let i=0;i<count;i++)
{
    console.log(await options.nth(i).innerText());
}
const timestamp=Date.now();
await page.screenshot({path:'screenshot/'+'homepage'+timestamp+'.png'});



    })


    

// test.only("Iframe Concept",async({page})=>{
//     page.goto("https://ui.vision/demo/webtest/frames/");

//     console.log("Total number of frames",page.frames());

//    const frame2= page.frameLocator("[src='frame_2.html']").locator("[name='mytext2']");
//    await frame2.fill("Hello World");

//    await page.waitForTimeout(5000);

//    const fram3=page.frame({url:'https://ui.vision/demo/webtest/frames/frame_3.html'});
//    if(fram3)
//    {
//     await fram3.fill("[name='mytext3']",'Nancy');
//     await page.waitForTimeout(5000)
//     const y=fram3.childFrames();
//     await y[0].locator("span='General Web Automation']").check();
// await page.waitForTimeout(5000)
//    }

// else {
//     console.log("Frames is not available");
// }
// })