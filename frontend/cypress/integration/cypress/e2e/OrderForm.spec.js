describe('OrderForm Component', () => {
    beforeEach(() => {
      // Visit the application before each test
      cy.visit('/');
    });
  
    it('should render form elements correctly', () => {
      // Check if the form fields and button are visible
      cy.get('input[placeholder="Product ID"]').should('be.visible');
      cy.get('input[placeholder="Quantity"]').should('be.visible');
      cy.get('input[placeholder="Customer Email"]').should('be.visible');
      cy.get('button').contains('Place Order').should('be.visible');
    });
  
    it('should submit form and display success message', () => {
      // Fill out the form
      cy.get('input[placeholder="Product ID"]').type('P001');
      cy.get('input[placeholder="Quantity"]').clear().type('1');
      cy.get('input[placeholder="Customer Email"]').type('test@example.com');
  
      // Submit the form
      cy.get('button').contains('Place Order').click();
  
      // Mock the API call and check for the success message
      cy.intercept('POST', '**/place-order', {
        statusCode: 200,
        body: { OrderId: '1234' },
      }).as('placeOrder');
  
      // Wait for the request and check if the success message is displayed
      cy.wait('@placeOrder');
      cy.get('.success-message').should('contain', 'Order placed successfully');
      cy.get('.order-number').should('contain', 'Order Number: 1234');
    });
  
    it('should display error message on failed form submission', () => {
      // Fill out the form
      cy.get('input[placeholder="Product ID"]').type('P001');
      cy.get('input[placeholder="Quantity"]').clear().type('1');
      cy.get('input[placeholder="Customer Email"]').type('test@example.com');
  
      // Mock the API call to simulate a failed order submission
      cy.intercept('POST', '**/place-order', {
        statusCode: 500,
        body: { error: 'Failed to place order' },
      }).as('placeOrder');
  
      // Submit the form
      cy.get('button').contains('Place Order').click();
  
      // Wait for the request and check if the error message is displayed
      cy.wait('@placeOrder');
      cy.get('.success-message').should('contain', 'Failed to place order');
    });
  
    it('should clear the form after a successful order submission', () => {
      // Fill out the form
      cy.get('input[placeholder="Product ID"]').type('P001');
      cy.get('input[placeholder="Quantity"]').clear().type('1');
      cy.get('input[placeholder="Customer Email"]').type('test@example.com');
  
      // Mock the API call
      cy.intercept('POST', '**/place-order', {
        statusCode: 200,
        body: { OrderId: '1234' },
      }).as('placeOrder');
  
      // Submit the form
      cy.get('button').contains('Place Order').click();
  
      // Wait for the request
      cy.wait('@placeOrder');
  
      // Check that the form fields are cleared after submission
      cy.get('input[placeholder="Product ID"]').should('have.value', '');
      cy.get('input[placeholder="Quantity"]').should('have.value', '1');
      cy.get('input[placeholder="Customer Email"]').should('have.value', '');
    });
  
    it('should display the current time at the top', () => {
      // Check if the current date and time is being displayed at the top
      const currentTime = new Date().toLocaleString();
      cy.get('.time-display').should('contain', currentTime);
    });
  });
  