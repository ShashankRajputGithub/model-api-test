Feature: Perform Inference Tests

  Background:
    Given that Model with Version exists

  Scenario: Add Model Version
    Then should return "404" on passing invalid version
    Then should return "500" on passing invalid model
    Then should return a valid response while performing inference