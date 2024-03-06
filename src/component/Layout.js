import React from 'react'
import { Container } from 'reactstrap'
import styled from 'styled-components'


const Styles = styled.div`
.container-fluid{
    padding: 0px 0px 0px 0px;
}
`

export default function Layout(props) {
    return (
        <Styles>
            <Container fluid>
                {props.children}
            </Container>
        </Styles>
    )
}