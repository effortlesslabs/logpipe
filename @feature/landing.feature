Feature: Create Space with Integration UI and API Key Generation

  Scenario: User creates a space and sees integration UI with API key generation
    Given the user is on the "Create Space" page
    When the user fills out the "Create Space" form with valid details
      | Field Name               | Value                    |
      | Space Name               | My New Space            |
      | Description              | A space for testing     |
      | Logger of Langchain Tracers | tracer-logs             |
    And the user clicks the "Create" button
    Then the space should be created successfully
    And the "Integration UI" should be displayed
    And the user should see the "Generate API Key" option
    And the user can generate an API key

  