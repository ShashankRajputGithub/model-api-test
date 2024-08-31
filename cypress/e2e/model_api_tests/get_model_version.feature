Feature: Get Model Version

  Background:
    Given that Model with Version exists

  Scenario: Add Model Version
    Then should return a version with parent details successfully
    Then should return "404" when invalid model id is passed get call
    #Same call exists in POST method while adding a version