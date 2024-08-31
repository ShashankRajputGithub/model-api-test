Feature: Get Model

  Background:
    Given that Model exists

  Scenario: Get Model Tests
    Then should return a successful response
    Then should have the correct model structure
    Then should return 405 for a non-existent model
    Then should return the correct model data