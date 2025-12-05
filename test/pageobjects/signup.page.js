const Page = require('./page')

class SignupPage extends Page {
    // Elements
    get cookieButton() { return $('[class="fc-button-label"]') }
    get slider() { return $('section[id="slider"]') }
    get signupLink() { return $('[href="/login"]') }
    get nameInput() { return $('[data-qa="signup-name"]') }
    get emailInput() { return $('[data-qa="signup-email"]') }
    get signupButton() { return $('[data-qa="signup-button"]') }
    get accountInfoHeading() { return $('b=Enter Account Information') }
    get passwordInput() { return $('[data-qa="password"]') }
    get daysDropdown() { return $('[data-qa="days"]') }
    get monthsDropdown() { return $('[data-qa="months"]') }
    get yearsDropdown() { return $('[data-qa="years"]') }
    get newsletterCheckbox() { return $('[for="newsletter"]') }
    get specialOffersCheckbox() { return $('[for="optin"]') }
    get firstNameInput() { return $('[data-qa="first_name"]') }
    get lastNameInput() { return $('[data-qa="last_name"]') }
    get addressInput() { return $('[data-qa="address"]') }
    get countryDropdown() { return $('[data-qa="country"]') }
    get stateInput() { return $('[data-qa="state"]') }
    get cityInput() { return $('[data-qa="city"]') }
    get zipcodeInput() { return $('[data-qa="zipcode"]') }
    get mobileInput() { return $('[data-qa="mobile_number"]') }
    get createAccountButton() { return $('[data-qa="create-account"]') }
    get accountCreatedText() { return $('[data-qa="account-created"]') }
    get continueButton() { return $('[data-qa="continue-button"]') }
    get loggedInText() { return $('*=Logged in as Jesse') }
    get deleteAccountLink() { return $('[href="/delete_account"]') }
    get accountDeletedText() { return $('[data-qa="account-deleted"]') }

    async open() {
        await super.open('/')
    }

    async acceptCookies() {
        if (await this.cookieButton.isDisplayed()) {
            await this.click(this.cookieButton)
        }
    }

    async signup(name, email) {
        await this.click(this.signupLink)
        await this.waitForDisplayed(this.nameInput)
        await this.nameInput.setValue(name)
        await this.emailInput.setValue(email)
        await this.click(this.signupButton)
    }

    async fillAccountInformation(password, day, month, year) {
        await this.waitForDisplayed(this.passwordInput)
        await this.passwordInput.setValue(password)
        await this.daysDropdown.selectByAttribute('value', day)
        await this.monthsDropdown.selectByAttribute('value', month)
        await this.yearsDropdown.selectByAttribute('value', year)
    }

    async selectNewsletters() {
        await this.click(this.newsletterCheckbox)
        await this.click(this.specialOffersCheckbox)
    }

    async fillAddressInformation(firstName, lastName, address, country, state, city, zipcode, mobile) {
        await this.firstNameInput.setValue(firstName)
        await this.lastNameInput.setValue(lastName)
        await this.addressInput.setValue(address)
        await this.countryDropdown.selectByVisibleText(country)
        await this.stateInput.setValue(state)
        await this.cityInput.setValue(city)
        await this.zipcodeInput.setValue(zipcode)
        await this.mobileInput.setValue(mobile)
    }

    async createAccount() {
        await this.click(this.createAccountButton)
    }

    async continueAfterCreation() {
        await this.waitForDisplayed(this.accountCreatedText)
        await this.click(this.continueButton)
    }

    async deleteAccount() {
        await this.click(this.deleteAccountLink)
    }
}

module.exports = new SignupPage()
