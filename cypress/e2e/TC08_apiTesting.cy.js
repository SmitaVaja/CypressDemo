import TestFilters from '../support/filterTests.js'

TestFilters(['regression','smoke'], () => {
    describe('API Testing with Cypress', () => {
        it('should validate the response from the BBC Locator API', () => {
          cy.request({
            method: 'GET',
            url: 'https://locator-service.api.bbci.co.uk/locations', // Base URL
            qs: { // Query parameters
              api_key: 'AGbFAKx58hyjQScCXIYrxuEwJh2W2cmv',
              stack: 'aws',
              locale: 'en',
              filter: 'international',
              'place-types': 'settlement,airport,district',
              order: 'importance',
              s: 'lo',
              a: true,
              format: 'json'
            }
          }).then((response) => {
            // Assert the response status
            expect(response.status).to.eq(200);
      
            // Assert the response body has the structure: response.results.results
            expect(response.body).to.have.property('response');
            expect(response.body.response).to.have.property('results');
            expect(response.body.response.results).to.have.property('results');
            
            // Assert that the results array is not empty
            const results = response.body.response.results.results;
            expect(results).to.be.an('array');
            expect(results.length).to.be.greaterThan(0);
      
            // Example assertion for the first result
            const firstResult = results[0];
            expect(firstResult).to.have.property('name', 'London');  // Example: Assert that the first result's name is 'London'
            expect(firstResult).to.have.property('placeType', 'settlement');  // Example: Assert that placeType is 'settlement'
            expect(firstResult).to.have.property('country', 'GB');  // Example: Assert that the country is 'GB'
          });
        });
    });
})