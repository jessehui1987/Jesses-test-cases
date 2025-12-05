const Page = require('./page')

class LoginPage extends Page {
    // elements
    get loginEmail() { return $('[data-qa="login-email"]') }
    get loginPassword() { return $('[data-qa="login-password"]') }
    get loginButton() { return $('[data-qa="login-button"]') }
    get loggedInText() { return $('*=Logged in as') }
    get signupLink() { return $('[href="/login"]') }

    async open() {
        await super.open('/login')
    }

    /**
     * Perform login with provided credentials
     * @param {string} email
     * @param {string} password
     */
    async login(email, password) {
        await this.click(this.signupLink)
        await this.waitForDisplayed(this.loginEmail)
        await this.loginEmail.setValue(email)
        await this.loginPassword.setValue(password)
        await this.click(this.loginButton)
    }

    /**
     * Check whether the UI shows 'Logged in as {name}' text
     * @param {string} name
     * @param {number} timeout
     */
    async isLoggedInAs(name, timeout = 5000) {
        const el = $(`*=Logged in as ${name}`)
        await this.waitForDisplayed(el, timeout)
        return el.isDisplayed()
    }
}

module.exports = new LoginPage()
