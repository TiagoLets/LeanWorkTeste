/// <reference types="cypress" />

describe('Cadastro', () => {
  before(() => {
    cy.visit('/')
    cy.restoreLocalStorage();
  })
  
  after(() => {
    cy.saveLocalStorage();
  });

  it('usuario consegue acessar a tela de cadastro', () => {
    cy.contains('Cadastrar').click()
  })

  it('formulário está aparecendo', () => {
    cy.get('#name').should('be.visible')
    cy.get('#email').should('be.visible')
    cy.get('#cpf').should('be.visible')
    cy.get('#phone').should('be.visible')
  })

  it('Deve ocorrer erro no email', () => {
    cy.get('#name').type('João')
    cy.get('#email').type('teste@')
    cy.get('#cpf').type('111111111')
    cy.get('#phone').type('4399999999')
    cy.contains('Cadastrar').click()
    cy.get('[data-cy=error-message-email]').should('contain', 'Por favor, digite um email válido.')
  })

  it('Deve ocorrer erro no cpf', () => {
    cy.get('[data-cy=error-message-cpf]').should('contain', 'Por favor digite um cpf válido.')
  })

  it('Deve ocorrer erro no telefone', () => {
    cy.get('[data-cy=error-message-phone]').should('contain', 'Digite um Telefone válido.')
  })

  it('Deve cadastrar um usuário', () => {
    cy.visit('/cadastro')
    cy.get('#name').type('João')
    cy.get('#email').type('joao@gmail.com')
    cy.get('#cpf').type('38153725009')
    cy.get('#phone').type('43999999999')

    cy.contains('Cadastrar').click()

    cy.location('pathname').should('eq', '/')

    cy.get('#list-users > div').eq(0) //arrumar
      .should('contain', 'Nome:João')
      .and('contain', 'Email:joao@gmail.com')
      .and('contain', 'CPF:381.537.250-09')
      .and('contain', 'Telefone:(43) 99999-9999')
  })
})

describe('Listagem', () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.visit('/')
  })

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('Deve persistir os dados do jõao', () => {
    cy.fixture('registerData.json').then(data => {
      cy.get('[data-cy=userCard]').eq(0)
        .should('contain', `Nome:${data.name}`)
        .and('contain', `Email:${data.email}`)
        .and('contain', `CPF:${data.cpf}`)
        .and('contain', `Telefone:${data.phone}`)
    })
  })

  it('Deve apagar e apresentar o empty state', () => {
    cy.get('[data-cy=deleteButton]').eq(0).click()
    cy.get('p').should('contain', 'Nenhum cadastro registrado')
  })
})