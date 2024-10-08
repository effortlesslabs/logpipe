### Title: Create Space with Integration UI and API Key Generation

#### Description

As a user, I want to be able to create a space by filling out a form so that I can manage my spaces effectively.

#### Acceptance Criteria

```gherkin
Feature: Create Space with Integration UI and API Key Generation

  Scenario: User creates a space and sees integration UI with API key generation
    Given the user is on the "Create Space" page
    When the user fills out the "Create Space" form with valid details
      | name               | space name                     |
      | description        | A space for testing      |
      | type               | logger and langchain traces    |
    And the user clicks the "Create" button
    Then the space should be created successfully
    And the "Integration UI" should be displayed
    And the user should see the "Generate API Key" option
    And the user can generate an API key

```

#### Additional Information

- Ensure that the buttons are styled according to the design specifications.
- Consider responsiveness for various screen sizes.
