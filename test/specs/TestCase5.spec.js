const { expect, browser, $ } = require('@wdio/globals')

describe('Demo TestCase1 test', () => {
    it('my first test', async () => {
        // Navigate to the website
        browser.url('https://automationexercise.com/')
        await $('[class="fc-button-label"]').click()
        await expect(await $('section[id="slider"]')).toBeDisplayed()
        await browser.pause(2000)

        // click on Signup/Login button
        await $('[href="/login"]').click()
        await expect(await $('h2=Login to your account')).toBeDisplayed()
        await browser.pause(2000)

        // Fill in the signup form
        await $('[data-qa="signup-name"]').setValue('Jesse')
        await $('[data-qa="signup-email"]').setValue('Jesse.hui+061@ii.co.uk')
        await $('[data-qa="signup-button"]').click()
        await browser.pause(3000)

        // Check Email already exists text
        await expect(await $('p=Email Address already exist!')).toBeDisplayed()
        await browser.pause(3000)
                
})
})
