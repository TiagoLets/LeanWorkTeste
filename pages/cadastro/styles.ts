import styled from 'styled-components'

const FlexContainer = styled.div`
    display: flex; 
    width: 100%;

    form {
      width: 100%;
    }

  .form-content {
    max-width: 400px;
    width: 100%;
  }
`

const Background = styled.div`
    min-height: inherit;
    min-height: 100vh;
    width: calc(100% - 530px);
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    background-blend-mode: multiply;
    background-image: url("/images/bg.jpg"), linear-gradient(to right, var(--primary-color), var(--secondary-color));
    background-blend-mode: multiply;
`

const Registration = styled.div`
    background-color: #fff;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    padding: 65px 50px;
    max-width: 530px;
    width: 100%;
    
    h1 {
    font-size: clamp(2rem, 3.125vw ,2.2rem);
    line-height: clamp(2.5rem ,4vw ,4.5rem);
    margin-bottom: 40px;
    color: #383838;
    font-weight: 300;
  }

    @media only screen and (max-width: 1600px) {
      padding: 50px 40px;
  
    h1 {
      margin-bottom: 30px;
    }
  }

  @media only screen and (max-width: 1200px) {
      padding: 35px 30px;
  
    h1 {
      margin-bottom: 20px;
    }
  }

  
  @media only screen and (max-width: 865px) {
    h1 {
      text-align: center;
    }
  
    .form-content form .flex-bottom {
      flex-direction: column;
      align-items: center;
    }
  
    .form-content form .flex-bottom * + * {
      margin-top: 15px;
    }
  }
`

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

   a {
    display: flex;
    font-size: 14px;
    color: #686868;
    align-items: center;
    letter-spacing: 0.7px;
  }
  img {
    color: inherit;
    height: 12px;
    width: auto;
    margin-left: 15px;
  }
`

export { Bottom , Registration , Background , FlexContainer  }