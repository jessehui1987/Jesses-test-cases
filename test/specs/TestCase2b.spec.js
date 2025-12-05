const { time } = require('console')
const loginPage = require('../pageobjects/login.page')
const signup = require('../pageobjects/signup.page')
const { expect, browser, $ } = require('@wdio/globals')
const { timeout } = require('async')

describe('Demo TestCase1 test', () => {
    it('my first test', async () => {


        // *** Navigate to the website ***
        await signup.open()
        await signup.acceptCookies()
        await expect(await signup.slider).toBeDisplayed()
        await browser.pause(2000)


        // *** click on Signup/Login button ***
        // *** Fill in login form ***
        await loginPage.login('jesse.hui+072@ii.co.uk', '1234567890aB')
        await browser.pause(2000)


        // ***Check logged in as text***
        await loginPage.isLoggedInAs('Jesse', 5000)


        // ***Delete account***
        await $('[href="/delete_account"]').click()
        await browser.pause(5000)
        //check account deleted text
        await expect(await $('[data-qa="account-deleted"]')).toBeDisplayed()
        
})
})
