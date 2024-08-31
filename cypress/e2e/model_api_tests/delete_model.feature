Feature: Delete Model

  Background:
    Given that Model exists

  Scenario: Delete Model
    Then should delete a new model successfully
    Then should return "404" when invalid model id is passed while deleting a model