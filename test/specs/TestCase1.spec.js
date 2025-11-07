
const { expect, browser, $ } = require('@wdio/globals')

describe('Demo TestCase1 test', () => {
    it('my first test', async () => {
        // Navigate to the website
        browser.url('https://automationexercise.com/')
        await $('[class="fc-button-label"]').click()
        await expect(await $('section[id="slider"]')).toBeDisplayed()

        // click on Signup/Login button
        await $('[href="/login"]').click()
        await expect(await $('h2=New User Signup!')).toBeDisplayed()

        // Fill in the signup form
        await $('[data-qa="signup-name"]').setValue('Jesse')
        await $('[data-qa="signup-email"]').setValue('Jesse.hui+061@ii.co.uk')
        await $('[data-qa="signup-button"]').click()
        await expect(await $('b=Enter Account Information')).toBeDisplayed()

        await $('[data-qa="password"]').setValue('1234567890aB')
        const daysDD = await $('[data-qa="days"]')
        await daysDD.selectByAttribute('value', '1')
        const monthsDD = await $('[data-qa="months"]')
        await monthsDD.selectByAttribute('value', '1')
        const yearsDD = await $('[data-qa="years"]')
        await yearsDD.selectByAttribute('value', '1990')
        // Pause for 3 seconds to observe the result
        await browser.pause(3000)

        // select checkbox options
        await $('[for="newsletter"]').click()
        await $('[for="optin"]').click()
        // Pause for 5 seconds to observe the result
        await browser.pause(5000)

        //Address information
        await $('[data-qa="first_name"]').setValue('Jesse')
        await $('[data-qa="last_name"]').setValue('Hui')
        await $('[data-qa="address"]').setValue('1 Jesse Street')
        const countryDD = await $('[data-qa="country"]')
        await countryDD.selectByVisibleText('United States')
        await $('[data-qa="state"]').setValue('Test State')
        await $('[data-qa="city"]').setValue('Test City')
        await $('[data-qa="zipcode"]').setValue('12345')
        await $('[data-qa="mobile_number"]').setValue('1234567890')

        // Pause for 5 seconds to observe the result
        await browser.pause(5000)
        //Click Continue
        await $('[data-qa="create-account"]').click()

        
        //Check account created text
        await expect(await $('[data-qa="account-created"]')).toBeDisplayed()
        // Pause for 5 seconds to observe the result
        await browser.pause(5000)

        //Click continue button
        await $('[data-qa="continue-button"]').click()
        //Check logged in as text
        await expect(await $('*=Logged in as Jesse')).toBeDisplayed()
        // Pause for 5 seconds to observe the result
        await browser.pause(5000)
       
        //Delete account
        await $('[href="/delete_account"]').click()
        //check account deleted text
        await expect(await $('[data-qa="account-deleted"]')).toBeDisplayed()
        await browser.pause(5000)
        
        //Click continue
        await $('[data-qa="continue-button"]').click()
        //Pause for 5 seconds to observe the result
        await browser.pause(5000)

    })
})