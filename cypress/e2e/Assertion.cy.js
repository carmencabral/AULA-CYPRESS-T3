describe('Assertion', () => {

    it('Assertions Implícitas', () => {
       cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
       
       //Should, and / útil para verificar token
    //    cy.url().should('include', 'orangehrmlive')
    //            .should('eq', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    //            .should('contain', 'opensource')

    //ASSERTION NA URL
    cy.url().should('include', 'orangehrmlive')
    .and('eq', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    .and('contain', 'opensource')
    .and('not.contain', 'bug')
    
    //ASSERTION NO TITLE
    cy.title().should('include', 'Orange')
        .and('eq', 'OrangeHRM')
        .and('contain', 'HRM')

    //ASSERTION PARA CONTAR OS LINKS NA PÁGINA
    cy.xpath('//a').should('have.length', '5')

    //ASSERTION NO LOGO
    cy.get('.orangehrm-login-logo > img').should('be.visible')
    .and('exist')

    //ASSERTION: VALOR DIGITADO CORRETAMENTE?
    cy.get("input[placeholder='Username']").type('Admin')
    cy.get("[placeholder='Username']").should('have.value', 'Admin')
    })

})

it('Assertions Explícitas', () => {
    //Entrar no site e fazer Login
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get("input[placeholder='Username']").type('Admin')
    cy.get("input[placeholder='Password']").type('admin123')  
    cy.xpath('//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/form/div[3]/button').click()
    //Assertion Explícita
    let expName = "Paul Collings"
    cy.get('.oxd-userdropdown-name').then( (x) => {
        let actName = x.text()
        //BDD - Behavior Driven Development
        expect(actName).to.equal(expName)
        //TDD - Test Driven Development
        assert.equal(actName, expName)
    })
    
})