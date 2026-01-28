Feature: Ditto Health Premium Validation

  Scenario: Verify total premium equals base + riders + GST
    Given user on Ditto website selects health product "HDFCERGO"
    When user fills Tell us about you form
    Then user validates premium breakup
