Feature: Signin Feature

    Scenario Outline: Sign in to BBC News and Weather Updates

        Given User is at the sign in page
        When User enters username as '<username>' and password as '<password>'
        And User clicks on signin button
        Then User is able to successfully signin to the Website
        Examples:
            | username | password |
            | smitavaja2206@gmail.com    | Beautiful2206 |
