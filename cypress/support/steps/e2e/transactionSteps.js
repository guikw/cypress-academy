import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";


//Operation
Given('customer selects Account {string}', (accNumber) => {
    cy.selectAcc(accNumber);
})

When('customer Deposits {string}', (custDepositValue) => {
    cy.customerDeposits(custDepositValue);
})

When('customer Withdrawls {string}', (custWithdrawlValue) => {
    cy.customerWithdrawls(custWithdrawlValue);
})

Then('customer Logouts', () => {
    cy.custoLogout();
}) 