Feature: Footer
  Scenario: should contain links to Feel website, forum, BBT thread, reddit twitter, Explorer Github
    Given I'm on page "/"
    Then I should see "website link" element that links to "https://feel.surf/"
    Then I should see "github link" element that links to "https://github.com/feelfoundation"
    Then I should see "youtube link" element that links to "https://www.youtube.com/channel/UCuqpGfg_bOQ8Ja4pj811PWg/featured"
    Then I should see "reddit link" element that links to "https://www.reddit.com/r/Feel/"
    Then I should see "linkedin link" element that links to "https://www.linkedin.com/company/feel/"
    Then I should see "twitter link" element that links to "https://twitter.com/feelfoundation"
    Then I should see "facebook link" element that links to "https://www.facebook.com/feelfoundation"
    Then I should see "discord link" element that links to "http://discord.gg/feel"

  @ignore
  Scenario: allows to show all 8 decimal places
    Given I'm on page "/"
    When I click "decimal places menu"
    And I click "show all 8"
    And I should see table "latest transactions" with 20 rows starting with:
      | Id                   | Timestamp                 | Sender      | Recipient             | Amount           | Fee              |
      |----------------------|---------------------------|-------------|-----------------------|------------------|------------------|
      | 292176566870988581   | /2017\/06\/19 \d\d:18:09/ | standby_301 | Explorer Account      | 123.45000000 GCC | 0.10000000 GCC   |
      | 4629979183209290127  | /2017\/06\/19 \d\d:17:59/ | standby_301 | Explorer Account      | 100.00000000 GCC | 0.10000000 GCC   |
      | 16747360986039780565 | /2017\/06\/19 \d\d:17:49/ | standby_301 | Explorer Account      | 100.12345678 GCC | 0.10000000 GCC   |
      | 2799279669192005501  | /2017\/06\/19 \d\d:17:39/ | standby_301 | Explorer Account      |   0.12345600 GCC | 0.10000000 GCC   |

  @ignore
  Scenario: allows to round to 4 decimal places
    Given I'm on page "/"
    When I click "decimal places menu"
    And I click "round to 4"
    And I should see table "latest transactions" with 20 rows starting with:
      | Id                   | Timestamp                 | Sender      | Recipient             | Amount       | Fee          |
      |----------------------|---------------------------|-------------|-----------------------|--------------|--------------|
      | 292176566870988581   | /2017\/06\/19 \d\d:18:09/ | standby_301 | Explorer Account      |  123.4500 GCC | 0.1000 GCC  |
      | 4629979183209290127  | /2017\/06\/19 \d\d:17:59/ | standby_301 | Explorer Account      |  100.0000 GCC | 0.1000 GCC  |
      | 16747360986039780565 | /2017\/06\/19 \d\d:17:49/ | standby_301 | Explorer Account      | ~100.1235 GCC | 0.1000 GCC  |
      | 2799279669192005501  | /2017\/06\/19 \d\d:17:39/ | standby_301 | Explorer Account      |   ~0.1235 GCC | 0.1000 GCC  |

  @ignore
  Scenario: allows to round to whole number
    Given I'm on page "/"
    When I click "decimal places menu"
    And I click "round to 0"
    And I should see table "latest transactions" with 20 rows starting with:
      | Id                   | Timestamp                 | Sender      | Recipient             | Amount           | Fee       |
      |----------------------|---------------------------|-------------|-----------------------|------------------|-----------|
      | 292176566870988581   | /2017\/06\/19 \d\d:18:09/ | standby_301 | Explorer Account      | ~123 GCC         | ~0 GCC    |
      | 4629979183209290127  | /2017\/06\/19 \d\d:17:59/ | standby_301 | Explorer Account      | 100 GCC          | ~0 GCC    |
      | 16747360986039780565 | /2017\/06\/19 \d\d:17:49/ | standby_301 | Explorer Account      | ~100 GCC         | ~0 GCC    |
      | 2799279669192005501  | /2017\/06\/19 \d\d:17:39/ | standby_301 | Explorer Account      | ~0 GCC           | ~0 GCC    |
  
  @ignore
  Scenario: allows to trim floating points 
    Given I'm on page "/"
    When I click "decimal places menu"
    And I click "trim floating points"
    And I should see table "latest transactions" with 20 rows starting with:
      | Id                   | Timestamp                 | Sender      | Recipient             | Amount           | Fee       |
      |----------------------|---------------------------|-------------|-----------------------|------------------|-----------|
      | 292176566870988581   | /2017\/06\/19 \d\d:18:09/ | standby_301 | Explorer Account      | 123.45 GCC       | 0.1 GCC   |
      | 4629979183209290127  | /2017\/06\/19 \d\d:17:59/ | standby_301 | Explorer Account      | 100 GCC          | 0.1 GCC   |
      | 16747360986039780565 | /2017\/06\/19 \d\d:17:49/ | standby_301 | Explorer Account      | 100.12345678 GCC | 0.1 GCC   |
      | 2799279669192005501  | /2017\/06\/19 \d\d:17:39/ | standby_301 | Explorer Account      | 0.123456 GCC     | 0.1 GCC   |
