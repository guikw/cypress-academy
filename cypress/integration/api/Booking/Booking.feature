#language: en
Feature: Booking API Testing

Background:
Given user verifies the Website endpoint

Scenario: API Test: New Booking
Given user creates a Token
When user submits a New Booking
Then user gets the Booking
And user updates the Booking