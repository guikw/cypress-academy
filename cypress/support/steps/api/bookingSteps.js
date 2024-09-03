import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

//API Test: Endpoint return
Given('user verifies the Website endpoint', () => {
    cy.verifyBookingEndpoint();
})

Given('user creates a Token', () => {
    cy.createTokenBooking();
})

When('user submits a New Booking', () => {
    cy.submitNewBooking();
})

Then('user gets the Booking', () => {
    cy.userGetsBooking();
})

When('user updates the Booking', () => {
    cy.userUpdatesBooking();
})