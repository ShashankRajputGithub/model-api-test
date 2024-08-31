Feature: Add Model

  Scenario: Add Model
    Then should create a new model successfully
    Then should return "422" when name is "not provided"
    Then should return "422" when name passed as "null"
