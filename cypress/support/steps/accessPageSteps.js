import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";


Given('I access bank Website', () => {
    cy.accessBankWebsite();
})

When('the bank Website return status {int}', (online) => {
    cy.bankReturn(online);
})

Then('user sees the welcome Bank Website', () => {
    cy.seeWelcomeBankPage();
})