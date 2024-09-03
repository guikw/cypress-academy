import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

//Login: Customer
Given('user login is a Customer', () => {
    cy.userCustomerLogin();
})

When('select Customer Login {string}', (customerName) => {
    cy.userCustomerSelect(customerName);
})

When('clicks on Login button', () => {
    cy.btnLogin();
})

Then('{string} access the bank account', (customerName) => {
    cy.userCustomerSucess(customerName);
})

//Manager: Add Customer
Given('user login is a Manager', () => {
    cy.userManagerLogin();
})

When('selects to add a Customer', () => {
    cy.addCustomerSelect();
})

When('fill {string} {string} {string}', (FirstName, LastName, PostCode) => {
    cy.writeAppInfo(FirstName, LastName, PostCode);
})

Then('submit new Customer and assert be successful', () => {
    cy.btnSubmitNewCustomer();
})

//Manager: Open Account
When('selects to Open Account', () => {
    cy.openAccount();
})

When('select type Currency {string}', (typeCurrency) => {
    cy.selectTypeCurrency(typeCurrency);
})

Then('process new Account and assert be sucessful', () => {
    cy.btnSubmitOpenAcc();
})

//Manager: Customers Search
When('selects to see Customers', () => {
    cy.seeCustomers();
})

When('search for Customer {string}', (FirstName) => {
    cy.searchCustomer(FirstName);
})

Then('asserts this {string} in the table', (FirstName) => {
    cy.custNameAvailable(FirstName);
})