import TestFilters from '../support/filterTests.js'

TestFilters([], () => {
    
    describe('BBC Weather Homepage', () => {
        it('Should load the weather homepage successfully', () => {
          cy.visit('https://www.bbc.co.uk/weather');
          cy.url().should('include', '/weather');  // Validate URL
          cy.get('header').should('be.visible');  // Ensure the header is visible
        });
    });
    
    describe('BBC Weather Location Search', () => {
        it('Should search for London and display results', () => {
          cy.visit('https://www.bbc.co.uk/weather');
          cy.get('input[type="text"]').type('London');
          cy.wait(2000);
          cy.get('ul#location-list').find('li').first().click();    
          cy.wait(2000);  
          cy.get('input[type="text"]').type('{enter}');
          cy.contains('London').should('be.visible');  // Validate that results contain 'London'
        });
    });

    describe('Search Results Validation', () => {
        it('Should display a list of location suggestions', () => {
          cy.visit('https://www.bbc.co.uk/weather');
          cy.get('input[type="text"]').type('London');
          cy.get('ul#location-list').should('exist');  // Validate the list exists
          cy.get('ul#location-list').find('li').should('have.length.greaterThan', 0);  // Ensure there are results
        });
    });

    describe('Select First Search Result', () => {
        it('Should select the first item from the search results list', () => {
          cy.visit('https://www.bbc.co.uk/weather');
          cy.get('input[type="text"]').type('London');
          cy.wait(2000);
          cy.get('ul#location-list').find('li').first().click();    
          cy.wait(2000);  
          cy.get('input[type="text"]').type('{enter}');
          cy.contains('London').should('be.visible');  // Ensure the page updates to London weather
        });
    });

    describe('Today\'s Weather Section', () => {
        it('Should display today\'s weather details after searching for a location', () => {
          cy.visit('https://www.bbc.co.uk/weather');
          cy.get('input[type="text"]').type('London');
          cy.wait(2000);
          cy.get('ul#location-list').find('li').first().click();    
          cy.wait(2000);  
          cy.get('input[type="text"]').type('{enter}');
          cy.contains('Today').should('be.visible');  // Verify that today's weather is shown
        });
    });


    describe('Temperature Unit Toggle', () => {
        it('Should toggle between Celsius and Fahrenheit', () => {
          cy.visit('https://www.bbc.co.uk/weather');
          cy.get('input[type="text"]').type('London');
          cy.wait(2000);
          cy.get('ul#location-list').find('li').first().click();    
          cy.wait(2000);  
          cy.get('input[type="text"]').type('{enter}');
          cy.contains('°C').should('be.visible');  // Celsius should be visible by default
          cy.contains('Change to Fahrenheit').click();  // Click to change unit
          cy.contains('°F').should('be.visible');  // Validate Fahrenheit appears
        });
    });

    describe('Hourly Forecast Section', () => {
        it('Should display the hourly forecast for a location', () => {
          cy.visit('https://www.bbc.co.uk/weather');
          cy.get('input[type="text"]').type('London');
          cy.wait(2000);
          cy.get('ul#location-list').find('li').first().click();    
          cy.wait(2000);  
          cy.get('input[type="text"]').type('{enter}');
          cy.contains('Hourly').click();  // Click the Hourly tab
          cy.get('.wr-time-slot').should('have.length.greaterThan', 0);  // Ensure there are hourly forecasts
        });
    });

    describe('5-Day Forecast Validation', () => {
        it('Should display weather forecast for the next 5 days', () => {
          cy.visit('https://www.bbc.co.uk/weather');
          cy.get('input[type="text"]').type('London');
          cy.wait(2000);
          cy.get('ul#location-list').find('li').first().click();    
          cy.wait(2000);  
          cy.get('input[type="text"]').type('{enter}');
          cy.get('.wr-day__title').should('have.length.greaterThan', 4);  // Ensure 5-day forecast is shown
        });
    });

    describe('Invalid Location Search', () => {
        it('Should display an error message when searching for an invalid location', () => {
          cy.visit('https://www.bbc.co.uk/weather');
          cy.get('input[type="text"]').type('London');
          cy.wait(2000);
          cy.get('ul#location-list').find('li').first().click();    
          cy.wait(2000);  
          cy.get('input[type="text"]').type('{enter}');
          cy.contains('Sorry').should('be.visible');  // Validate error message
        });
    });

    describe('Footer Links Validation', () => {
        it('Should ensure footer links exist and are clickable', () => {
          cy.visit('https://www.bbc.co.uk/weather');
          cy.get('footer').should('be.visible');  // Ensure footer is visible
          cy.get('footer a').each(($link) => {
            cy.wrap($link).should('have.attr', 'href').and('not.be.empty');  // Check all links have href attributes
          });
        });
    });
})