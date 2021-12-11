import styled from 'styled-components'

export const InputContainer = styled.div`
    margin-bottom: 40px;
    
    input {
        display: flex;
        height: 35px;
        border-width: 0 0 1px 0;
        border-style: solid;
        border-color: #dbdbdb;
        width: 100%;
        color: #efeeed;

        &:focus {
            color: #555555;
        }
    }

    label {
        color: #999999;
        margin-bottom: 5px;
    }

    .error-message {
        color: #A91919;
        font-size: 0.85rem;
    }

    @media only screen and (max-width: 865px) {
        label {
        margin-bottom: 3px;
        }
        input {
        height: 25px;
        }
    }
`