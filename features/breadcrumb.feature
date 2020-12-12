Feature: Breadcrumb
  Scenario: allows to trim floating points 
    Given I'm on page "/"
    When I click "rounding menu" no. 2
    And I click "trim floating points" no. 2
    And I should see table "latest transactions" with 10 rows starting with:
      | Id                   | Timestamp                 | Sender      | Recipient             | Amount           | Fee       |
      |----------------------|---------------------------|-------------|-----------------------|------------------|-----------|
      | 292176566870988581   | /2017\/06\/19 \d\d:18:09/ | standby_301 | Explorer Account      | 123.45 GCC       | 0.1 GCC   |
      | 4629979183209290127  | /2017\/06\/19 \d\d:17:59/ | standby_301 | Explorer Account      | 100 GCC          | 0.1 GCC   |
      | 16747360986039780565 | /2017\/06\/19 \d\d:17:49/ | standby_301 | Explorer Account      | 100.12345678 GCC | 0.1 GCC   |
      | 2799279669192005501  | /2017\/06\/19 \d\d:17:39/ | standby_301 | Explorer Account      | 0.123456 GCC     | 0.1 GCC   |

  Scenario: allows to round to whole number
    Given I'm on page "/"
    When I click "rounding menu" no. 2
    And I click "round to 0" no. 2
    And I should see table "latest transactions" with 10 rows starting with:
      | Id                   | Timestamp                 | Sender      | Recipient             | Amount           | Fee       |
      |----------------------|---------------------------|-------------|-----------------------|------------------|-----------|
      | 292176566870988581   | /2017\/06\/19 \d\d:18:09/ | standby_301 | Explorer Account      | ~123 GCC         | ~0 GCC    |
      | 4629979183209290127  | /2017\/06\/19 \d\d:17:59/ | standby_301 | Explorer Account      | 100 GCC          | ~0 GCC    |
      | 16747360986039780565 | /2017\/06\/19 \d\d:17:49/ | standby_301 | Explorer Account      | ~100 GCC         | ~0 GCC    |
      | 2799279669192005501  | /2017\/06\/19 \d\d:17:39/ | standby_301 | Explorer Account      | ~0 GCC           | ~0 GCC    |

  Scenario: allows to round to 4 decimal places
    Given I'm on page "/"
    When I click "rounding menu" no. 2
    And I click "round to 4" no. 2
    And I should see table "latest transactions" with 10 rows starting with:
      | Id                   | Timestamp                 | Sender      | Recipient             | Amount       | Fee          |
      |----------------------|---------------------------|-------------|-----------------------|--------------|--------------|
      | 292176566870988581   | /2017\/06\/19 \d\d:18:09/ | standby_301 | Explorer Account      |  123.4500 GCC | 0.1000 GCC  |
      | 4629979183209290127  | /2017\/06\/19 \d\d:17:59/ | standby_301 | Explorer Account      |  100.0000 GCC | 0.1000 GCC  |
      | 16747360986039780565 | /2017\/06\/19 \d\d:17:49/ | standby_301 | Explorer Account      | ~100.1235 GCC | 0.1000 GCC  |
      | 2799279669192005501  | /2017\/06\/19 \d\d:17:39/ | standby_301 | Explorer Account      |   ~0.1235 GCC | 0.1000 GCC  |

  Scenario: allows to show all 8 decimal places
    Given I'm on page "/"
    When I click "rounding menu" no. 2
    And I click "show all 8" no. 2
    And I should see table "latest transactions" with 10 rows starting with:
      | Id                   | Timestamp                 | Sender      | Recipient             | Amount           | Fee              |
      |----------------------|---------------------------|-------------|-----------------------|------------------|------------------|
      | 292176566870988581   | /2017\/06\/19 \d\d:18:09/ | standby_301 | Explorer Account      | 123.45000000 GCC | 0.10000000 GCC   |
      | 4629979183209290127  | /2017\/06\/19 \d\d:17:59/ | standby_301 | Explorer Account      | 100.00000000 GCC | 0.10000000 GCC   |
      | 16747360986039780565 | /2017\/06\/19 \d\d:17:49/ | standby_301 | Explorer Account      | 100.12345678 GCC | 0.10000000 GCC   |
      | 2799279669192005501  | /2017\/06\/19 \d\d:17:39/ | standby_301 | Explorer Account      |   0.12345600 GCC | 0.10000000 GCC   |
  
  Scenario: should allow to switch currency to BTC
    Given I'm on page "/"
    When I click "GCC menu" no. 2
    And I click "BTC" no. 2
    And I should see table "latest transactions" with 10 rows starting with:
      | Id                 | Timestamp                 | Sender      | Recipient             | Amount                      | Fee                |
      |--------------------|---------------------------|-------------|-----------------------|-----------------------------|--------------------|
      | 292176566870988581 | /2017\/06\/19 \d\d:18:09/ | standby_301 | Explorer Account      | /~\d+(,\d{3})?(\.\d+)? BTC/ | /~\d+(\.\d+)? BTC/ |
  
  @ignore
  Scenario: should allow to switch currency to CNY
    Given I'm on page "/"
    When I click "GCC menu" no. 2
    And I click "CNY" no. 2
    And I should see table "latest transactions" with 10 rows starting with:
      | Id                 | Timestamp                 | Sender      | Recipient             | Amount                      | Fee                |
      |--------------------|---------------------------|-------------|-----------------------|-----------------------------|--------------------|
      | 292176566870988581 | /2017\/06\/19 \d\d:18:09/ | standby_301 | Explorer Account      | /~\d+(,\d{3})?(\.\d+)? CNY/ | /~\d+(\.\d+)? CNY/ |

  Scenario: should allow to switch currency to USD
    Given I'm on page "/"
    When I click "GCC menu" no. 2
    And I click "USD" no. 2
    And I should see table "latest transactions" with 10 rows starting with:
      | Id                 | Timestamp                 | Sender      | Recipient             | Amount                      | Fee                |
      |--------------------|---------------------------|-------------|-----------------------|-----------------------------|--------------------|
      | 292176566870988581 | /2017\/06\/19 \d\d:18:09/ | standby_301 | Explorer Account      | /~\d+(,\d{3})?(\.\d+)? USD/ | /~\d+(\.\d+)? USD/ |

  Scenario: should allow to switch currency to EUR
    Given I'm on page "/"
    When I click "GCC menu" no. 2
    And I click "EUR" no. 2
    And I should see table "latest transactions" with 10 rows starting with:
      | Id                 | Timestamp                 | Sender      | Recipient             | Amount                      | Fee                |
      |--------------------|---------------------------|-------------|-----------------------|-----------------------------|--------------------|
      | 292176566870988581 | /2017\/06\/19 \d\d:18:09/ | standby_301 | Explorer Account      | /~\d+(,\d{3})?(\.\d+)? EUR/ | /~\d+(\.\d+)? EUR/ |

  @ignore
  Scenario: should allow to switch currency to RUB
    Given I'm on page "/"
    When I click "GCC menu" no. 2
    And I click "RUB" no. 2
    And I should see table "latest transactions" with 10 rows starting with:
      | Id                 | Timestamp                 | Sender      | Recipient             | Amount                      | Fee                |
      |--------------------|---------------------------|-------------|-----------------------|-----------------------------|--------------------|
      | 292176566870988581 | /2017\/06\/19 \d\d:18:09/ | standby_301 | Explorer Account      | /~\d+(,\d{3})?(\.\d+)? RUB/ | /~\d+(\.\d+)? RUB/ |

  @ignore
  Scenario: should allow to switch currency to JPY
    Given I'm on page "/"
    When I click "GCC menu" no. 2
    And I click "JPY" no. 2
    And I should see table "latest transactions" with 10 rows starting with:
      | Id                 | Timestamp                 | Sender      | Recipient             | Amount                      | Fee                |
      |--------------------|---------------------------|-------------|-----------------------|-----------------------------|--------------------|
      | 292176566870988581 | /2017\/06\/19 \d\d:18:09/ | standby_301 | Explorer Account      | /~\d+(,\d{3})?(\.\d+)? JPY/ | /~\d+(\.\d+)? JPY/ |

  @ignore
  Scenario: should allow to switch currency to PLN
    Given I'm on page "/"
    When I click "GCC menu" no. 2
    And I click "PLN" no. 2
    And I should see table "latest transactions" with 10 rows starting with:
      | Id                 | Timestamp                 | Sender      | Recipient             | Amount                      | Fee                |
      |--------------------|---------------------------|-------------|-----------------------|-----------------------------|--------------------|
      | 292176566870988581 | /2017\/06\/19 \d\d:18:09/ | standby_301 | Explorer Account      | /~\d+(,\d{3})?(\.\d+)? PLN/ | /~\d+(\.\d+)? PLN/ |

  @ignore
  Scenario: should allow to switch currency to GBP
    Given I'm on page "/"
    When I click "GCC menu" no. 2
    And I click "GBP" no. 2
    And I should see table "latest transactions" with 10 rows starting with:
      | Id                 | Timestamp                 | Sender      | Recipient             | Amount                      | Fee                |
      |--------------------|---------------------------|-------------|-----------------------|-----------------------------|--------------------|
      | 292176566870988581 | /2017\/06\/19 \d\d:18:09/ | standby_301 | Explorer Account      | /~\d+(,\d{3})?(\.\d+)? GBP/ | /~\d+(\.\d+)? GBP/ |

  Scenario: should allow to switch currency to GCC
    Given I'm on page "/"
    When I click "GCC menu" no. 2
    And I click "GCC" no. 2
    And I should see table "latest transactions" with 10 rows starting with:
      | Id                 | Timestamp                 | Sender      | Recipient             | Amount                     | Fee               |
      |--------------------|---------------------------|-------------|-----------------------|----------------------------|-------------------|
      | 292176566870988581 | /2017\/06\/19 \d\d:18:09/ | standby_301 | Explorer Account      | /\d+(,\d{3})?(\.\d+)? GCC/ | /\d+(\.\d+)? GCC/ |
