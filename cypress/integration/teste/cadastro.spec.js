/// <reference types="cypress" />

describe('Cadastro', () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.visit('http://localhost:8080/')
    cy.contains('Cadastrar').click()
    cy.location('pathname', {
      timeout: 1000
    }).should('include', '/cadastro');
  })
  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('formulário está aparecendo', () => {
    cy.get('#name').should('be.visible')
    cy.get('#email').should('be.visible')
    cy.get('#cpf').should('be.visible')
    cy.get('#phone').should('be.visible')
  })

  it('Validar erros input', () => {
    cy.contains('Cadastrar').click()
    cy.get('.error-message').eq(0).should('contain', 'Por favor, digite seu nome.')
    cy.get('.error-message').eq(1).should('contain', 'Por favor, digite seu e-mail.')
    cy.get('.error-message').eq(2).should('contain', 'Por favor, digite o seu cpf.')
    cy.get('.error-message').eq(3).should('contain', 'Por favor, digite um telefone.')
  })

  it('Deve recusar um email inválido', () => {
    cy.get('#email').type('testeInvalido')
    cy.contains('Cadastrar').click()
    cy.get('.error-message').eq(1).should('contain', 'Por favor, digite um email válido.')
  })

  it('Deve recusar um cpf inválido', () => {
    cy.get('#cpf').type('12121212121')
    cy.contains('Cadastrar').click()
    cy.get('.error-message').eq(2).should('contain', 'Por favor digite um cpf válido.')
  })

  it('Deve recusar um telefone inválido', () => {
    cy.get('#phone').type('1231231231')
    cy.contains('Cadastrar').click()
    cy.get('.error-message').eq(3).should('contain', 'Digite um Telefone válido.')
  })

  it('Deve cadastrar um usuário', () => {
    cy.get('#name').type('João')
    cy.get('#email').type('joao@gmail.com')
    cy.get('#cpf').type('38153725009')
    cy.get('#phone').type('43999999999')

    cy.contains('Cadastrar').click()

    cy.location('pathname').should('eq', '/')

    cy.get('#list-users > div').eq(0)
      .should('contain', 'Nome:João')
      .and('contain', 'Email:joao@gmail.com')
      .and('contain', 'CPF:381.537.250-09')
      .and('contain', 'Telefone:(43) 99999-9999')
  })
})

describe('Listagem', () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.visit('http://localhost:8080/')
  })

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('Deve persistir os dados do jõao', () => {
    cy.get('#list-users > div').eq(0)
      .should('contain', 'Nome:João')
      .and('contain', 'Email:joao@gmail.com')
      .and('contain', 'CPF:381.537.250-09')
      .and('contain', 'Telefone:(43) 99999-9999')
  })

  it('Deve apagar e apresentar o empty state', () => {
    cy.get('#list-users > div').eq(0).find('.excluir').click()
    cy.get('p').should('contain', 'Nada por aqui ;(')
  })
})