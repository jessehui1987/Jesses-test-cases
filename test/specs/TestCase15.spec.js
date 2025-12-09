const signup = require('../pageobjects/signup.page')
const contactUs = require('../pageobjects/contact.page')
const { expect, browser, $ } = require('@wdio/globals')

describe('Demo TestCase1 test', () => {
    it('my first test', async () => {


        // *** Navigate to the website ***
        await signup.open()
        await signup.acceptCookies()
        await expect(await signup.slider).toBeDisplayed()


        // *** click on Signup/Login button ***
        await signup.signup('Jesse', 'jesse.hui+076@ii.co.uk')
        await expect(await signup.accountInfoHeading).toBeDisplayed()


        // *** Fill in the signup form ***
        await signup.fillAccountInformation('1234567890aB', '1', '1', '1990')
        await signup.selectNewsletters()
        await browser.pause(5000)
        await signup.fillAddressInformation('Jesse', 'Hui', '1 Jesse Street', 'United States', 'Test State', 'Test City', '12345', '1234567890')
        await browser.pause(5000)
       

        await signup.createAccount()
                await expect(signup.accountCreatedText).toBeDisplayed()
        await signup.continueAfterCreation()
                await expect(signup.loggedInText).toBeDisplayed()

        
        
    })
})
