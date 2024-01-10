let opcaoLogin = 1
function preencherCredenciais(){
    switch (opcaoLogin) {
        case 1: //Login com credenciais válidas
            //Preencher o campo usuário com dados válidos
            cy.get('input#user-name').type('standard_user')
            //Preencher o campo password com dados válidos
            cy.get("input[placeholder='Password']").type('secret_sauce')
            break;
        case 2: //Login com username inválido
            //Preencher o campo usuário com dados inválidos
            cy.get('input#user-name').type('standard_user123')
            //Preencher o campo password com dados válidos
            cy.get("input[placeholder='Password']").type('secret_sauce')
            break;
        case 3: //Login com senha inválida
            //Preencher o campo usuário com dados válidos
            cy.get('input#user-name').type('standard_user')
            //Preencher o campo password com dados inválidos
            cy.get("input[placeholder='Password']").type('secret_sauce123')
            break;
        case 4: //Login com username vazio
            //Preencher o campo password com dados válidos
            cy.get("input[placeholder='Password']").type('secret_sauce')
            break;
        case 5: //Login com senha vazia
            //Preencher o campo usuário com dados válidos
            cy.get('input#user-name').type('standard_user')
            break;
        default: //opção de Login inexistente
            break;
    }
}

beforeEach(() => {
    //Visitar a página
    cy.visit('https://www.saucedemo.com/v1/index.html')
    
    preencherCredenciais()

    //clicar no botão login
    cy.get('input.btn_action').click()
})

describe('Login', () => {
    //opcaoLogin 1
    it('Login com credenciais válidas', () => {
        //Verificar se estou na página inventory.html
        cy.get('title').contains('Swag Labs')
        //Assertion na url
        cy.url().should('contain', 'saucedemo')
        .and('eq', 'https://www.saucedemo.com/v1/inventory.html')
    })
    
    //opcaoLogin 2
    // it('Login com username inválido', () => {
    //     //Verificar se username é inválido
    //     cy.get("[placeholder='Username']").should('have.value', 'standard_user123')
    //     .and('not.eq', 'standard_user123')
    //     //Verificar se mensagem de erro está visível
    //     cy.get('#login_button_container > div > form > h3').should('be.visible')
    //     //Verificar se texto da mensagem de erro está correto
    //     let expName = "Epic sadface: Username and password do not match any user in this service"
    //     cy.get('#login_button_container > div > form > h3').then( (x) => {
    //         let actName = x.text()
    //         //BDD - Behavior Driven Development
    //         expect(actName).to.equal(expName)
    //         //TDD - Test Driven Development
    //         // assert.equal(actName, expName)
    //     })
    // })
    
    //opcaoLogin 3
    // it('Login com senha inválida', () => {
    //     //Verificar se senha é inválida
    //     cy.get("[placeholder='Password']").should('have.value', 'secret_sauce123')
    //     .not('eq', 'secret_sauce123')
    //     //Verificar se mensagem de erro está visível
    //     cy.get('#login_button_container > div > form > h3').should('be.visible')
    //     //Verificar se texto da mensagem de erro está correto
    //     let expName = "Epic sadface: Username and password do not match any user in this service"
    //     cy.get('#login_button_container > div > form > h3').then( (x) => {
    //         let actName = x.text()
    //         //BDD - Behavior Driven Development
    //         expect(actName).to.equal(expName)
    //     })
    // })  

    //opcaoLogin 4
    // it('Login com username vazio', () => {
    //     //Verificar se username está vazio
    //     cy.get("[placeholder='username']").should('have.length', 0)
    //     .and('not.exist')
    //     //Verificar se mensagem de erro está visível
    //     cy.get('#login_button_container > div > form > h3').should('be.visible')
    //     //Verificar se texto da mensagem de erro está correto
    //     let expName = "Epic sadface: Username is required"
    //     cy.get('#login_button_container > div > form > h3').then( (x) => {
    //         let actName = x.text()
    //         //TDD - Test Driven Development
    //         assert.equal(actName, expName)
    //     })
    // })

    //opcaoLogin 5
    // it('Login com senha vazia', () => {
    //     //Verificar se senha está vazia
    //     cy.get("[placeholder='Password']").should('have.value', '')
    //     .and('be.empty')
    //     //Verificar se mensagem de erro está visível
    //     cy.get('#login_button_container > div > form > h3').should('be.visible')
    //     //Verificar se texto da mensagem de erro está correto
    //     let expName = "Epic sadface: Password is required"
    //     cy.get('#login_button_container > div > form > h3').then( (x) => {
    //         let actName = x.text()
    //         //TDD - Test Driven Development
    //         assert.equal(actName, expName)
    //     })
    // })

})


describe('Adicionar ao carrinho', () => {
    it('Adicionar um item ao carrinho', () => {
        //clicar no botão 'ADD TO CART'
       cy.xpath('//*[@id="inventory_container"]/div/div[1]/div[3]/button').click()
       //verificar se o botão mudou para 'REMOVE'
       cy.xpath('//*[@id="inventory_container"]/div/div[1]/div[3]/button').contains('REMOVE')
       //verificar se a bolinha com quantidade de itens está visível e se existe no carrinho
       cy.get('#shopping_cart_container > a > span').should('be.visible')
       .and('exist') 
    })

    it('Remover um item do carrinho', () => {
        //clicar no botão 'ADD TO CART'
       cy.xpath('//*[@id="inventory_container"]/div/div[1]/div[3]/button').click()
        //clicar no botão 'REMOVE'
        cy.xpath('//*[@id="inventory_container"]/div/div[1]/div[3]/button').click()
        //verificar se o botão mudou para 'ADD TO CART'
        cy.xpath('//*[@id="inventory_container"]/div/div[1]/div[3]/button').contains('ADD TO CART')
        //verificar se a bolinha com quantidade de itens NÃO existe no carrinho
        cy.get('#shopping_cart_container > a > span').should('not.exist') //'not.be.visible': dá erro
    })
})

describe('Checkout', () => {
    it('Checkout com sucesso', () => {
      //Clicar no carrinho
      cy.xpath('//*[@id="shopping_cart_container"]/a').click()
      //verificar se estou na página 'cart.html (Your Cart)'
      cy.xpath('//*[@id="contents_wrapper"]/div[2]').contains('Your Cart')
      //Clicar no botão CHECKOUT
      cy.xpath('//*[@id="cart_contents_container"]/div/div[2]/a[2]').click()
      //Verificar se estou na página 'checkout-step-one.html (Checkout: Your Information)'  
      cy.xpath('//*[@id="contents_wrapper"]/div[2]').contains('Checkout: Your Information')  
      //Preencher campo 'First Name'
      cy.get('#first-name').type('Carmen')
      //Verificar se First Name foi digitado corretamente
      cy.get("[placeholder='First Name']").should('have.value', 'Carmen')
      //Preencher campo 'Last Name'
      cy.get('#last-name').type('Cabral')
      //Verificar se Last Name foi digitado corretamente
      cy.get("[placeholder='Last Name']").should('have.value', 'Cabral')
      //Preencher campo 'Zip/Postal Code'
      cy.get('#postal-code').type('4444-444')
      //Verificar se Zip/Code foi digitado corretamente
      cy.get("[placeholder='Zip/Postal Code']").should('have.value', '4444-444')
      //Clicar no botão 'Continue'
      cy.xpath('//*[@id="checkout_info_container"]/div/form/div[2]/input').click()
      //Verificar se estou na página 'checkout-step-two.html (Checkout: Overview)'
      cy.xpath('//*[@id="contents_wrapper"]/div[2]').contains('Checkout: Overview')
      //Clicar no botão 'Finish'
      cy.xpath('//*[@id="checkout_summary_container"]/div/div[2]/div[8]/a[2]').click()
      //Verificar se estou na página 'checkout-complete.html (Finish)'
      cy.xpath('//*[@id="contents_wrapper"]/div[2]').contains('Finish')
      //mensagem de checkout: THANK YOU FOR YOUR ORDER
      //Verificar se mensagem de checkout está visível
      cy.xpath('//*[@id="checkout_complete_container"]/h2').should('be.visible')
      //Verificar se texto da mensagem de checkout está correto
      let expName = "THANK YOU FOR YOUR ORDER"
      cy.xpath('//*[@id="checkout_complete_container"]/h2').then( (x) => {
          let actName = x.text()
          //TDD - Test Driven Development
          assert.equal(actName, expName)
      })
      //Verificar se a imagem do checkout está visível e se existe
      cy.get('#checkout_complete_container > img').should('be.visible')
        .and('exist')
    })  
})