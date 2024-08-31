Feature: Delete Model Version

  Background:
    Given that Model with Version exists

  Scenario: Add Model Version
    Then should delete a model version successfully
    Then should return "404" when invalid model version id is passed