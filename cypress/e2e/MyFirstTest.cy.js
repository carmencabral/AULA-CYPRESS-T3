describe('Verificação de título da página', () => {
  it('TC1 - Verificar o título da página - Positivo', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.title().should('eq', 'OrangeHRM')
  })

  it('TC2 - Verificar o título da página - Negativo', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.title().should('eq', 'OrangeHRM123')
  })

})