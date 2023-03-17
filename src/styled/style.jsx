import styled from "styled-components";

export const BackImage = styled.div`
    background: ${props => `url(${props.backImg})`};
    background-size:cover;
    background-position: center;
    background-attachment:fixed;
`