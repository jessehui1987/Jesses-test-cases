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
        // *** Fill in login form ***
        await loginPage.login('abc@ii.co.uk', '1234567890aB')
        await browser.pause(5000)


        // Check incorrect login text
        await expect(await $('p=Your email or password is incorrect!')).toBeDisplayed()
        await browser.pause(5000)
})
})
