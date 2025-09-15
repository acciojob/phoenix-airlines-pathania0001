/// <reference types="Cypress"/>

describe('Flight Booking App',()=>{

  const baseURL = "http://localhost:8080";
  
  beforeEach(() => {
    cy.visit(baseURL);
  });

  it('Checking if the app is rendered',()=>{
      cy.contains('Flight Booking App');
      cy.contains('Welcome to Flight Booking App');
      cy.get('button').should('exist');
  })

  it('Checking if drop-down and buttons are working and verifying when flights are not available',() => {
      cy.get('button').click()
      //checking first input field
      cy.get("input[type='text']").first().click()
      cy.get('ul').should('exist')
      cy.get("input[type='text']").first()
        .click().type('be').get('li').contains('Bengaluru').click()
      

      //Checking second input field
      cy.get("input[type='text']").eq(1)
        .click()
      cy.get('ul').should('exist')
      cy.get("input[type='text']").eq(1)
        .click().type('ko').get('li').contains('Kolkata').click()
      
      cy.get('button').should('be.disabled')

      cy.get("input[type=date]")
        .type('2023-03-27').should('have.attr','value','2023-03-27')
      cy.get('button').last().should('be.enabled').click()

      cy.contains('No Records Found..')
  })

  it('Filling out the form and search for the flights and verifying when flights are available',()=>{
      cy.get('button').click()

      //checking for one way destination
      cy.get('input[type="radio"]').first().check()

      //Selecting Source city
      cy.get("input[type='text']").first()
        .click().type('mum').get('li').contains('Mumbai').click()

      //Selecting Destination city
      cy.get("input[type='text']").eq(1)
        .click().type('ne').get('li').contains('New Delhi').click()

      //Selecting Date
      cy.get("input[type=date]")
        .type('2023-04-06')
      cy.get('button').last().click()

      //Selecting flight from available flights
      cy.get('.book_flight').first().click()
      
  })

  it('Validations for person details form',()=>{
      cy.get('button').click()

      //checking for one way destination
      cy.get('input[type="radio"]').first().check()

      //Selecting Source city
      cy.get("input[type='text']").first()
        .click().type('mum').get('li').contains('Mumbai').click()

      //Selecting Destination city
      cy.get("input[type='text']").eq(1)
        .click().type('ne').get('li').contains('New Delhi').click()

      //Selecting Date
      cy.get("input[type=date]")
        .type('2023-04-06')
      cy.get('button').last().click()

      //Selecting flight from available flights
      cy.get('.book_flight').first()
        .click()

      //First and Last Name
      // cy.get("input[type='text']").eq(0)
      //   .click()
      cy.get("input[type='text']").eq(0).type('Sherlock', {force: true})
      cy.get("input[type='text']").eq(1)
        .click()
        .type('Holmes', {force: true})
      
      cy.get('button').last().click()
      //Should not submit form if all the mandate fields are not filled
      cy.contains('All Fields are mandatory')

      //Validating email address & phone number
      cy.get('input').eq(2)
        .click()
        .type('sherlock')
      cy.get('input').eq(3)
        .click()
        .type('9876543210')
      cy.contains('All Fields are mandatory')
      cy.get('input').eq(2)
        .clear()
        .click()
        .type('sherlock_holmes@gmail.com')
      cy.get('input').eq(3)
        .clear()
        .click()
        .type('987654321')
      cy.contains('All Fields are mandatory')

      //Should submit form when all details are correctly filled
      cy.get('input').eq(3)
        .clear()
        .click()
        .type('9876543210')
      cy.get('button').click()
        
      cy.contains('Thank you for the Booking. Click the below button to return to home page')
      cy.get('button').last().click()
      cy.contains('Welcome to Flight Booking App')
  })

  it('Validating Round Trip booking',()=>{
      
      cy.window().then((win) => {
          cy.stub(win.console, 'log').as('consoleLog');
      });
      
      cy.get('button').click()
      cy.get("input[type='radio']").eq(1).check()
      cy.get("input[type='text']").first()
        .click().type('mum').get('li').contains('Mumbai').click()
      cy.get("input[type='text']").eq(1)
        .click().type('kol').get('li').contains('Kolkata').click()
      cy.get("input[type='date']").first()
        .type('2023-04-12')
      cy.get("input[type='date']").eq(1)
        .type('2023-07-28')
      cy.get('button').last().click()
      cy.get('button').eq(1).click()
      
      cy.get("input[type='text']").first()
        .type('Yamraj')
      cy.get("input[type='text']").eq(1)
        .type('Singh')
      cy.get('input').eq(2)
        .type('yamraj_singh@death.heaven')
      cy.get('input').eq(3)
        .type('1313131313')
      cy.get('.book_flight').eq(0).click()
      // cy.get('@consoleLog').should('have.been.calledWithMatch', {
      //     airlineLogo: "https://www.logosurfer.com/wp-content/uploads/2018/03/air-india-logo_0.png",
      //     airlineName: "Air India",
      //     arivalCity: "Kolkata",
      //     arivalTime: "05:00",
      //     deptCity: "Mumbai",
      //     deptTime: "03:00",
      //     flightNbr: "AI-275",
      //     noOfStops: "0",
      //     price: "1500"
      //   });
  })
})