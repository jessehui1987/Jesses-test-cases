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

        // Fill in login form
        await $('[data-qa="login-email"]').setValue('Jesse.hui+061@ii.co.uk')
        await $('[data-qa="login-password"]').setValue('1234567890aB') 
        await $('[data-qa="login-button"]').click()
        await browser.pause(3000)

        // Check logged in as text
        await expect(await $('b=Jesse')).toBeDisplayed()
        // Pause for 3 seconds to observe the result
        await browser.pause(3000)

        //Click logout button
        await $('[href="/logout"]').click()
        await expect(await $('h2=Login to your account')).toBeDisplayed()
        await browser.pause(2000)
})
})
