const signup = require('../pageobjects/signup.page')
const loginPage = require('../pageobjects/login.page')
const { expect, browser, $ } = require('@wdio/globals')

describe('Demo TestCase1 test', () => {
    it('my first test', async () => {
        
        // *** Navigate to the website ***
        await signup.open()
        await signup.acceptCookies()
        await expect(await signup.slider).toBeDisplayed()
        await browser.pause(2000)


        // *** click on Signup/Login button ***
        // *** Fill in the signup form ***
        await signup.signup('Jesse', 'jesse.hui+072@ii.co.uk')


        // *** Check Email already exists text ***
                await expect(await loginPage.emailAlreadyExistsError).toBeDisplayed()
                
})
})
