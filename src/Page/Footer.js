import React from 'react'
import { Col, Row, Container } from 'react-bootstrap'
import styled from 'styled-components'


export default function Footer() {
    return (
        <Styles>
            <Container fluid className="footer-container">
                <Row>
                    <Col>
                        <p>&copy; StockWatch </p>
                    </Col>
                </Row>

            </Container>
        </Styles >
    )
}

const Styles = styled.div`
.footer-container{
    background-color:#004050;
}
.row{
    margin-left: auto; 
    margin-right: auto;
}
p{
    text-align: center;
    color:white;
}
`