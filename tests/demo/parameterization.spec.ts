import{test,expect} from '@playwright/test';
import fs from 'fs';
import * as XLSX from 'xlsx';
const excelPath='C:\\Users\\nandh\\OneDrive\\Documents\\Playwright_E2E_test\\data\\Parameter.xlsx'
//const data=JSON.parse(fs.readFileSync(path.join(__dirname,"../testData/loginData.json"),"utf-8"));
const workbook=XLSX.readFile(excelPath);
const sheetName=workbook.SheetNames[0];
const worksheet=workbook.Sheets[sheetName];
const excelData: any=XLSX.utils.sheet_to_json(worksheet);
console.log(excelData);
for(const row of excelData){
    test(`Login with ${row.username} and ${row.Password}`,async({page})=>{
        await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
        await page.getByPlaceholder("Username").fill(row.username);
        await page.getByPlaceholder("Password").fill(row.Password);
        await page.getByRole('button', { name: 'Login' }).click();
        if(row.Validity === "Valid"){
            console.log("Valid credentials");
            await expect(page.getByText("Invalid credentials")).toBeVisible();
        }

    })
}
