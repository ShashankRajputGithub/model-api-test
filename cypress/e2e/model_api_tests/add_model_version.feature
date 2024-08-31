Feature: Add Model Version

  Background:
    Given that Model exists

  Scenario: Add Model Version
    Then should create a new model version successfully
    Then should return "404" when invalid model id is passed