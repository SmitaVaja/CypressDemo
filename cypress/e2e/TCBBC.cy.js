import TestFilters from '../support/filterTests.js'

TestFilters([], () => {
    describe('Search for Google BBC page from google website (Smoke)', () => {
        before(() => {
            cy.visit('https://www.bbc.co.uk/')
            //cy.visit('https://www.bbc.co.uk/weather')
        })

        it('Validate Page Title', () => {
            cy.title().should('eq', 'BBC - Home')
        })

        it('Should navigate to weather page and search for London', () => {
            // Step 1: Visit the BBC Weather homepage
            cy.visit('https://www.bbc.co.uk/weather');

            cy.title().should('eq', 'BBC Weather - Home')
        
            // Step 2: Interact with the search bar to type in "London"
            cy.get('input[type="text"]').type('London');
            
            // Step 3: Wait for the search results (assuming they are dynamically loaded)
            cy.wait(2000); // You can adjust the wait based on the actual loading time or use better waiting strategies like `.should()`.
        
            // Step 4: Find the ul with id=location-list and select the first li from the list
            cy.get('ul#location-list')  // Get the ul with id=location-list
            .find('li')               // Find all li inside the ul
            .first()                  // Select the first li
            .click();                 // Click the first li
        
            // Step 5: Click on the search button (or press enter to search)
            cy.get('input[type="text"]').type('{enter}');
        
            // Step 6: Check if the search results are displayed
            cy.contains('London').should('be.visible');
        });
        
    })
})