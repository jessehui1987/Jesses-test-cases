class Page {
    /**
     * Open a path on the base URL
     * @param {string} path
     */
    async open(path = '/') {
        await browser.url(`https://automationexercise.com${path}`)
    }

    /**
     * Wait for an element to be displayed
     * @param {WebdriverIO.Element} element
     * @param {number} timeout
     */
    async waitForDisplayed(element, timeout = 5000) {
        await element.waitForDisplayed({ timeout })
    }

    /**
     * Click an element with a built-in wait for clickable
     * @param {WebdriverIO.Element} element
     */
    async click(element) {
        await element.waitForClickable({ timeout: 5000 })
        await element.click()
    }

    /**
     * Attempt to detect and close common popups/overlays.
     * This is best-effort and swallows errors to avoid breaking tests.
     */
    async dismissPopup() {
        const closeSelectors = [
            '.modal .close',
            '.modal .btn-close',
            '.popup-close',
            '[aria-label="close"]',
            '.newsletter-skip',
            '.cookie-accept',
        ]

        for (const sel of closeSelectors) {
            try {
                const nodes = await $$(sel)
                for (const n of nodes) {
                    try {
                        if (await n.isDisplayed()) {
                            await browser.execute((el) => el.click(), n)
                            await browser.pause(200)
                        }
                    } catch (e) { /* ignore individual element errors */ }
                }
            } catch (e) { /* ignore selector errors */ }
        }

        // Hide common ad iframes that frequently intercept clicks
        try {
            const iframes = await $$('iframe[id^="aswift_"], iframe[src*="doubleclick"]')
            for (const f of iframes) {
                try { await browser.execute((ifr) => ifr.style.display = 'none', f) } catch (e) { }
            }
        } catch (e) { /* ignore */ }
    }

    /**
     * Click with retries: wait + normal click, else dismiss popups and JS-click.
     * @param {WebdriverIO.Element} element
     */
    async safeClick(element) {
        try {
            await element.waitForClickable({ timeout: 10000 })
            await element.click()
        } catch (err) {
            // try dismissing popups then fallback
            try { await this.dismissPopup() } catch (e) { }
            try {
                await element.scrollIntoView({ block: 'center' })
                await browser.execute((el) => el.click(), element)
            } catch (e) {
                throw err
            }
        }
    }
}

module.exports = Page
