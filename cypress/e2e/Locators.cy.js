beforeEach(() => {
    //Visitar a página
    cy.visit('https://www.saucedemo.com/v1/index.html')
    //Preencher o campo usuário
    cy.get('input#user-name').type('standard_user')
    //Preencher o campo password
    cy.get("input[placeholder='Password']").type('secret_sauce')
    //clicar no botão login
    cy.get('input.btn_action').click()
})

describe('CSSLocators', () => {
    it('Login válido', () => {
        //verificar se estou na página inventory.html
        cy.get('title').contains('Swag Labs')
    })

    it('Xpath', () => {
       //clicar no botão 'Add to cart'
       cy.xpath('//*[@id="inventory_container"]/div/div[1]/div[3]/button').click()
       //verificar se o botão mudou para 'REMOVE'
       cy.xpath('//*[@id="inventory_container"]/div/div[1]/div[3]/button').contains('REMOVE') 
    })
})
