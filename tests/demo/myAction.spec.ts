import {test,expect, Locator} from '@playwright/test'
test.fixme("verify the action ",async({page})=>{
   await page.goto("https://testautomationpractice.blogspot.com/");
   const textbox : Locator = await page.locator('#name');
    const maxlength : string | null = await textbox.getAttribute("maxlength");
expect(maxlength).toBe("15");
await textbox.fill("Nandhini");
 const enterValued :string= await textbox.inputValue();
 console.log(enterValued);

 expect(enterValued).toBe("Nandhini");
 await page.waitForTimeout(3000);
const male:Locator=await page.locator("#male");
await male.isVisible();
await male.isEnabled();
// await  expect(male).toBeChecked();
await male.click();
await expect(male.isChecked()).toBe(true)



})
test("Verify the Radio1 button",async({page})=>{
console.log("Radio button concept is skiiped");
}
)
test("Checkbox concept",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    
    
    const checkbx:Locator=page.getByLabel("Monday");
    await checkbx.scrollIntoViewIfNeeded();
    await checkbx.check();

    const days: string[]=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

    const checkboxed:Locator[]=days.map(index=>page.getByLabel(index));

    for (const chkbox of checkboxed)
    {
        await chkbox.check();
    }

await page.waitForTimeout(3000);


})
test("Dopdown condown",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const checkbx:Locator=page.getByLabel("Colors:");
await checkbx.scrollIntoViewIfNeeded();

   await page.locator("#country").selectOption('Japan');
const Dropdow:Locator=await page.locator("#country > option");
await expect(Dropdow).toHaveCount(10);
  const optionText:string[]= (await Dropdow.allTextContents()).map(text=>text.trim());
console.log(optionText);

for(const textv of optionText)
{
console.log(textv);
}
})