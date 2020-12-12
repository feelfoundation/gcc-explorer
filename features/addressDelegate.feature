Feature: Delegate page
  Scenario: should show title, summary, and transactions
    Given I'm on page "/address/537318935439898807L"
    Then I should see "537318935439898807L" in "top title" element
    And I should see "Delegate account" in "sub title" element
    And I should see "Home Address 537318935439898807L" in "breadcrumb" element
    And I should see table "summary" containing:
      | Owner         | genesis_17                                                       |
      | Address       | 537318935439898807L                                              |
      | Public Key    | 86499879448d1b0215d59cbf078836e3d7d9d2782d56a2274a568761bff36f19 |
      | Total balance | 3,288.91044586 GCC                                               |
      | Transactions  | 1021 1                                                           |

    And I should see table "transactions table" with 20 rows starting with:
      | Transaction ID | Date                      | Sender                | Recipient    | Amount       | Fee     | Confirm.      |
      |----------------|---------------------------|-----------------------|--------------|--------------|---------|---------------|
      | /\d{18,20}/    | /2017\/06\/16 \d\d:58:48/ | 16313739661670634666L | genesis_17   | 0.00545 GCC  | 0.1 GCC | Confirmed     |
      | /\d{18,20}/    | /2017\/06\/16 \d\d:58:48/ | 16313739661670634666L | genesis_17   | 0.006476 GCC | 0.1 GCC | Confirmed     |
      | /\d{18,20}/    | /2017\/06\/16 \d\d:58:48/ | 16313739661670634666L | genesis_17   | 0.019556 GCC | 0.1 GCC | Confirmed     |
      | /\d{18,20}/    | /2017\/06\/16 \d\d:58:48/ | 16313739661670634666L | genesis_17   | 0.021278 GCC | 0.1 GCC | Confirmed     |
      | /\d{18,20}/    | /2017\/06\/16 \d\d:58:48/ | 16313739661670634666L | genesis_17   | 0.027222 GCC | 0.1 GCC | Confirmed     |
  
  Scenario: should link transaction id to transaction page
    Given I'm on page "/address/537318935439898807L"
    And I click link on row no. 1 cell no. 1 of "transactions" table
    Then I should be on page "/tx/4160462017991891150"
  
  Scenario: should link sender address to address page
    Given I'm on page "/address/537318935439898807L"
    And I click link on row no. 1 cell no. 3 of "transactions" table
    Then I should be on page "/address/16313739661670634666L"

  Scenario: should allow to load more transactions
    Given I'm on page "/address/537318935439898807L"
    And I wait 0.5 seconds
    When I click "btn next" no. 1
    Then I should see table "transactions table" with 20 rows
  
  Scenario: should allow to load less transactions
    Given I'm on page "/address/537318935439898807L"
    When I click "btn next" no. 1
    And I wait 0.5 seconds
    And I should see table "transactions table" with 20 rows
    And I click "btn prev" no. 1
    And I wait 0.5 seconds
    Then I should see table "transactions table" with 20 rows
  
  Scenario: should allow to show voters
    Given I'm on page "/address/537318935439898807L"
    And I wait 0.5 seconds
    When I click "details tab" no. 1
    Then I should see "16313739661670634666L • gottavoteemall •" in "voters" element
  
  Scenario: should link voters to address page
    Given I'm on page "/address/537318935439898807L"
    And I wait 0.5 seconds
    When I click "details tab"
    When I click "voter link" no. 1
    Then I should be on page "/address/16313739661670634666L"
  
  Scenario: should allow to show votes
    Given I'm on page "/address/4401082358022424760L"
    And I wait 0.5 seconds
    When I click "details tab"
    Then I should see "genesis_1 • genesis_10 • genesis_100 • genesis_101 • genesis_11 • genesis_12 • genesis_13 • genesis_14 • genesis_15 • genesis_16 • genesis_17 • genesis_18 • genesis_19 • genesis_2 • genesis_20 • genesis_21 • genesis_22 • genesis_23 • genesis_24 • genesis_25 • genesis_26 • genesis_27 • genesis_28 • genesis_29 • genesis_3 • genesis_30 • genesis_31 • genesis_32 • genesis_33 • genesis_34 • genesis_35 • genesis_36 • genesis_37 • genesis_38 • genesis_39 • genesis_4 • genesis_40 • genesis_41 • genesis_42 • genesis_43 • genesis_44 • genesis_45 • genesis_46 • genesis_47 • genesis_48 • genesis_49 • genesis_5 • genesis_50 • genesis_51 • genesis_52 • genesis_53 • genesis_54 • genesis_55 • genesis_56 • genesis_57 • genesis_58 • genesis_59 • genesis_6 • genesis_60 • genesis_61 • genesis_62 • genesis_63 • genesis_64 • genesis_65 • genesis_66 • genesis_67 • genesis_68 • genesis_69 • genesis_7 • genesis_70 • genesis_71 • genesis_72 • genesis_73 • genesis_74 • genesis_75 • genesis_76 • genesis_77 • genesis_78 • genesis_79 • genesis_8 • genesis_80 • genesis_81 • genesis_82 • genesis_83 • genesis_84 • genesis_85 • genesis_86 • genesis_87 • genesis_88 • genesis_89 • genesis_9 • genesis_90 • genesis_91 • genesis_92 • genesis_93 • genesis_94 • genesis_95 • genesis_96 • genesis_97 • genesis_98 • genesis_99" in "votes" element
  
  Scenario: should link votes to address page
    Given I'm on page "/address/4401082358022424760L"
    And I wait 0.5 seconds
    When I click "details tab"
    And I wait 0.5 seconds
    And I click "vote link" no. 1
    Then I should be on page "/address/8273455169423958419L"

  Scenario: should show the total number of voters
    Given I'm on page "/address/11595026565287740051L"
    And I wait 0.5 seconds
    And I click "details tab"
    And I should see "2" in "voter count" element

  Scenario: should show Forging statistics
    Given I'm on page "/address/11595026565287740051L"
    And I wait 0.5 seconds
    And I click "details tab"
    And I should see table "forging statistics" containing:
    | Name          | genesis_42             |
    | Address       | 11595026565287740051L  |
    | Uptime        | 100%                   |
    | Rank / Status | 25 / Active            |
    | Approval      | 99.58%                 |
    | Vote weight   | 99,685,421.108366 GCC  |
    | Forged        | 1,172.91881186 GCC     |
    | Blocks        | 241 (0 missed)         |
                                        


