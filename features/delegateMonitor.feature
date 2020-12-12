Feature: Delegate Monitor
  Scenario: should show delegates, last block, next forgers, ...
    Given I'm on page "/delegateMonitor"
    And I should see "Home Delegate Monitor" in "breadcrumb" element
    And I should see "delegates" element with content that matches:
      """
      DELEGATES
      403
      101 active delegates
      302 delegates on standby
      """
    And I should see "last block" element with content that matches:
      """
      LAST BLOCK BY
      genesis_\d{1,3}
      \d{18,20}
      \d+ GCC forged from \d+ transactions
      """
    And I should see "next forgers" element with content that matches:
      """
      NEXT FORGERS
      genesis_\d{1,3}
      (genesis_\d{1,3} • ){8}genesis_\d{1,3}
      """
    And I should see "total forged" element with content that matches:
      """
      TOTAL FORGED \(GCC\)
      ~\d{1,3},\d{3}\
      between 101 active delegates
      """
    And I should see "best forger" element with content that matches:
      """
      BEST FORGER
      genesis_\d{1,3}
      \d{1,3},\d{3}\.\d{8} GCC forged
      since registration
      """
    And I should see "best productivity" element with content that matches:
      """
      BEST PRODUCTIVITY
      100%
      by genesis_\d{1,3}
      """
    And I should see "worst productivity" element with content that matches:
      """
      WORST PRODUCTIVITY
      \d{1,3}(\.\d\d?)?%
      by genesis_\d{1,3}
      """
    And I should see table "active delegates" with 101 rows starting with:
      | Rank | Name              | Address      | Forged              | Forging time | Status | Productivity         | Approval            |
      |------|-------------------|--------------|---------------------|--------------|--------|----------------------|---------------------|
      | 1    | /genesis_\d{1,3}/ | /\d{10,20}L/ | /~1,\d{3} GCC/      | /.+/         |        | /\d{2,3}(\.\d{2})?%/ |/\d{2,3}(\.\d{2})?%/ |
      | 2    | /genesis_\d{1,3}/ | /\d{10,20}L/ | /~1,\d{3} GCC/      | /.+/         |        | /\d{2,3}(\.\d{2})?%/ |/\d{2,3}(\.\d{2})?%/ |
      | 3    | /genesis_\d{1,3}/ | /\d{10,20}L/ | /~1,\d{3} GCC/      | /.+/         |        | /\d{2,3}(\.\d{2})?%/ |/\d{2,3}(\.\d{2})?%/ |
      | 4    | /genesis_\d{1,3}/ | /\d{10,20}L/ | /~1,\d{3} GCC/      | /.+/         |        | /\d{2,3}(\.\d{2})?%/ |/\d{2,3}(\.\d{2})?%/ |
      | 5    | /genesis_\d{1,3}/ | /\d{10,20}L/ | /~1,\d{3} GCC/      | /.+/         |        | /\d{2,3}(\.\d{2})?%/ |/\d{2,3}(\.\d{2})?%/ |

  Scenario: should show latest votes and newest delegates at the tab Latest updates
    Given I'm on page "/delegateMonitor"
    When I click "nav link" no. 3
    Then I should see table "votes" containing:
      | Voter          | Transaction   | Time               |
      |----------------|---------------|--------------------|
      | standby_301    | 112677…741572 | /(\d+\|a) \w+ ago/ |
      | gottavoteemall | 178350…512638 | /(\d+\|a) \w+ ago/ |
      | gottavoteemall | 182949…153226 | /(\d+\|a) \w+ ago/ |
      | gottavoteemall | 153903…944871 | /(\d+\|a) \w+ ago/ |
      | gottavoteemall | 921170…373690 | /(\d+\|a) \w+ ago/ |
    And I should see table "registrations" containing:
      | Delegate          | Transaction    | Time               |
      |-------------------|----------------|--------------------|
      | gottavoteemall    | 253594…103126  | /(\d+\|a) \w+ ago/ |
      | /standby_\d{1,3}/ | 772503…232644  | /(\d+\|a) \w+ ago/ |
      | /standby_\d{1,3}/ | 358389…812364  | /(\d+\|a) \w+ ago/ |
      | /standby_\d{1,3}/ | 338619…483526  | /(\d+\|a) \w+ ago/ |
      | /standby_\d{1,3}/ | 158151…771288  | /(\d+\|a) \w+ ago/ |    

  Scenario: should allow to sort active delegates
    Given I'm on page "/delegateMonitor"
    When I click link on header cell no. 2 of "active delegates" table
    Then I should see table "active delegates" with 101 rows starting with:
      | Rank      | Name      | Address      | Forged              | Forging time | Status | Productivity         | Approval            |
      |-----------|-----------|--------------|---------------------|--------------|--------|----------------------|---------------------|
      | /\d{1,3}/ | genesis_1 | /\d{10,20}L/ | /~1,\d{3} GCC/      | /.+/         |        | /\d{2,3}(\.\d{2})?%/ |/\d{2,3}(\.\d{2})?%/ |
      | /\d{1,3}/ | genesis_2 | /\d{10,20}L/ | /~1,\d{3} GCC/      | /.+/         |        | /\d{2,3}(\.\d{2})?%/ |/\d{2,3}(\.\d{2})?%/ |
      | /\d{1,3}/ | genesis_3 | /\d{10,20}L/ | /~1,\d{3} GCC/      | /.+/         |        | /\d{2,3}(\.\d{2})?%/ |/\d{2,3}(\.\d{2})?%/ |
      | /\d{1,3}/ | genesis_4 | /\d{10,20}L/ | /~1,\d{3} GCC/      | /.+/         |        | /\d{2,3}(\.\d{2})?%/ |/\d{2,3}(\.\d{2})?%/ |
      | /\d{1,3}/ | genesis_5 | /\d{10,20}L/ | /~1,\d{3} GCC/      | /.+/         |        | /\d{2,3}(\.\d{2})?%/ |/\d{2,3}(\.\d{2})?%/ |

  Scenario: should allow show delegate status tooltip
    Given I'm on page "/delegateMonitor"
    When I hover "forging status" no. 1
    Then I should see "tooltip" element with content that matches:
      """
      \w+( \w+)*
      Last block forged @ \d+
      (\d+|a few|an|a) \w+ ago
      """

  Scenario: latest votes should link to voter
    Given I'm on page "/delegateMonitor"
    When I click "nav link" no. 3
    Then I click link on row no. 1 cell no. 1 of "votes" table
    And I should be on page "/address/14895491440237132212L"

  Scenario: latest votes should link to transaction
    Given I'm on page "/delegateMonitor"
    When I click "nav link" no. 3
    Then I click link on row no. 1 cell no. 2 of "votes" table
    And I should be on page "/tx/11267727202420741572"

  Scenario: newest delegates should link to delegate
    Given I'm on page "/delegateMonitor"
    When I click "nav link" no. 3
    Then I click link on row no. 1 cell no. 1 of "registrations" table
    And I should be on page "/address/4401082358022424760L"

  Scenario: newest delegates should link to transaction
    Given I'm on page "/delegateMonitor"
    When I click "nav link" no. 3
    Then I click link on row no. 1 cell no. 2 of "registrations" table
    And I should be on page "/tx/2535943083975103126"

  Scenario: active delegates should link to delegate
    Given I'm on page "/delegateMonitor"
    And I click link on row no. 5 cell no. 2 of "active delegates" table
    Then I should be on page that matches "/address/\d{10,20}L"

  Scenario: allows to see standby delegates
    Given I'm on page "/delegateMonitor"
    When I click "standby delegates tab"
    Then I should see table "standby delegates" with 20 rows starting with:
      | Rank | Name              | Address      | Productivity | Approval |
      |------|-------------------|--------------|--------------|----------|
      | 102  | /standby_\d{1,3}/ | /\d{10,20}L/ | 0%           | 0%       |
      | 103  | /standby_\d{1,3}/ | /\d{10,20}L/ | 0%           | 0%       |
      | 104  | /standby_\d{1,3}/ | /\d{10,20}L/ | 0%           | 0%       |
      | 105  | /standby_\d{1,3}/ | /\d{10,20}L/ | 0%           | 0%       |
      | 106  | /standby_\d{1,3}/ | /\d{10,20}L/ | 0%           | 0%       |

  Scenario: allows to go to next page of standby delegates
    Given I'm on page "/delegateMonitor"
    When I click "standby delegates tab"
    And I click "more button"
    Then I should see table "standby delegates" with 20 rows starting with:
      | Rank | Name              | Address      | Productivity | Approval |
      |------|-------------------|--------------|--------------|----------|
      | 122  | /standby_\d{1,3}/ | /\d{10,20}L/ | 0%           | 0%       |
      | 123  | /standby_\d{1,3}/ | /\d{10,20}L/ | 0%           | 0%       |
      | 124  | /standby_\d{1,3}/ | /\d{10,20}L/ | 0%           | 0%       |
      | 125  | /standby_\d{1,3}/ | /\d{10,20}L/ | 0%           | 0%       |
      | 126  | /standby_\d{1,3}/ | /\d{10,20}L/ | 0%           | 0%       |

  Scenario: allows to go to previous page of standby delegates
    Given I'm on page "/delegateMonitor"
    When I click "standby delegates tab"
    And I click "more button"
    And I wait 0.5 seconds
    And I click "less button"
    Then I should see table "standby delegates" with 20 rows starting with:
      | Rank | Name              | Address      | Productivity | Approval |
      |------|-------------------|--------------|--------------|----------|
      | 102  | /standby_\d{1,3}/ | /\d{10,20}L/ | 0%           | 0%       |
      | 103  | /standby_\d{1,3}/ | /\d{10,20}L/ | 0%           | 0%       |
      | 104  | /standby_\d{1,3}/ | /\d{10,20}L/ | 0%           | 0%       |
      | 105  | /standby_\d{1,3}/ | /\d{10,20}L/ | 0%           | 0%       |
      | 106  | /standby_\d{1,3}/ | /\d{10,20}L/ | 0%           | 0%       |

  Scenario: standby delegates should link to delegate
    Given I'm on page "/delegateMonitor"
    When I click "standby delegates tab"
    And I click link on row no. 1 cell no. 2 of "standby delegates" table
    Then I should be on page that matches "/address/\d{10,20}L"
