const Page = require('./page')

class LoginPage extends Page {
    // elements
    get loginEmail() { return $('[data-qa="login-email"]') }
    get loginPassword() { return $('[data-qa="login-password"]') }
    get loginButton() { return $('[data-qa="login-button"]') }
    get LoginText() { return $('h2=Login to your account') }
    get loggedInText() { return $('*=Logged in as') }
    get signupLink() { return $('[href="/login"]') }
    get logoutLink() { return $('[href="/logout"]') }
    get emailAlreadyExistsError() { return $('p=Email Address already exist!') }

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
        await this.waitForDisplayed(this.LoginText)
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

    /**
     * Click the logout link and verify we are back on the login page
     * @param {number} timeout
     */
    async logout(timeout = 5000) {
        if (await this.logoutLink.isDisplayed()) {
            await this.click(this.logoutLink)
        } else {
            // try a text selector fallback
            const logoutByText = await $('=Logout')
            if (await logoutByText.isExisting()) {
                await this.click(logoutByText)
            }
        }
        return this.isOnLoginPage(timeout)
    }

    /**
     * Return true if the login page is displayed
     * @param {number} timeout
     */
    async isOnLoginPage(timeout = 5000) {
        await this.waitForDisplayed(this.LoginText, timeout)
        return this.LoginText.isDisplayed()
    }
}

module.exports = new LoginPage()
