const signup = require('../pageobjects/signup.page')
const contactUs = require('../pageobjects/contact.page')
const { expect, browser, $ } = require('@wdio/globals')

describe('Demo TestCase1 test', () => {
    it('my first test', async () => {


        // *** Navigate to the website ***
        await signup.open()
        await signup.acceptCookies()
        await expect(await signup.slider).toBeDisplayed()

       // *** Click contact us button ***
       await contactUs.openContact()

       // *** Fill in contact us form ***
       
        await contactUs.submitContactForm ('Jesse', 'test@test.com', 'Test subject', 'This is a test message.', 'C:\\Users\\HUIJ1\\OneDrive - Interactive Investor\\Documents\\TESTING.txt')
        await browser.pause(10000)
        // *** Verify success message 'Success! Your details have been submitted successfully.' is visible ***
        await contactUs.getSuccessText(10000)
        await browser.pause(2000)

        // *** Click Home button using page object ***
        await contactUs.goHome()
        await expect(await $('section[id="slider"]')).toBeDisplayed()
        await browser.pause(1000)
    })
})
