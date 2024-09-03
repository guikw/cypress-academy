#language: en
Feature: Access Bank Page

Background: Access URL Base
    Given I access bank Website

    Scenario: Welcome Bank Page
    When the bank Website return status 200
    Then user sees the welcome Bank Website