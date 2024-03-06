import React from 'react'
import homepage from '../img/homepage1.png';
import card1 from '../img/card1.png';
import card2 from '../img/card2.png';
import card3 from '../img/responsive.PNG';
import { Image, Button, Card, Col, Row, Container, CardDeck } from 'react-bootstrap'
import styled, { keyframes } from 'styled-components'


export default function HomePage() {
    return (
        <Styles>
            <Image src={homepage} fluid className='image' />
            <div className='heading'>
                <h2>Fast. Reliable. Easy.</h2>
                <h5>Stockwatch brings all you need for keeping updated with stocks. Searching stocks price
                        becomes easy with just few clicks. </h5>
                <Button variant="info" size="lg" href="/search" className="heading-btn">Get Started</Button>
            </div>
            {/* Card */}
            <h3 className='card-heading'>Do More with StockWatch</h3>
            <hr></hr>
            <CardDeck>
                <Card className='card-content'>
                    <Card.Img variant="top" src={card1} />
                    <Card.Body>
                        <Card.Title>Quick Search</Card.Title>
                        <Card.Text>
                            Find what you need fast. Intellegently find stocks symbol and industry when you need it.
                            Now, finding the stocks that you want is easier.
                             </Card.Text>
                    </Card.Body>
                </Card>
                <Card className='card-content'>
                    <Card.Img variant="top" src={card3} />
                    <Card.Body>
                        <Card.Title>View Everywhere</Card.Title>
                        <Card.Text>
                            Watch the stocks price everywhere, anywhere. Our webpage is available to view from phone,
                            tablet, or laptop. Now, watching stock price is easier with StockWatch!
                    </Card.Text>
                    </Card.Body>
                </Card>
                <Card className='card-content'>
                    <Card.Img variant="top" src={card2} />
                    <Card.Body>
                        <Card.Title>Interactive Chart</Card.Title>
                        <Card.Text>
                            Filter the date of stock price that you need and the we accurately create the chart for you.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </CardDeck>
            <Container fluid className="start-container">
                <Row>
                    <Col sm={12} md={7}><h1>Let's Get Started!</h1></Col>
                    <Col sm={12} md={5} className='btn-start'>
                        <Button variant="info" href="/search" size="lg" className="btn-start-big" >Get Started</Button>
                    </Col>
                </Row>
            </Container>

        </Styles >
    )
}

//styling
const fadeIn = keyframes`
0% {
    opacity: 0;
  }
100% {
    opacity: 1;
  }

`
const Styles = styled.div` 
.heading{
    position:absolute;
    top:25%;
    left:60%;
    justify-content:center;
    font-family: monospace;
    animation: 4s ${fadeIn} ease-out;
}

.heading button{
    margin-top:1rem;
}

.img{
    width:100%;
}
.card-deck{
    width:85%;
    margin:0 auto;
}

.card-heading{
    padding-top: 2rem;
    padding-bottom:1rem;
    text-align: center;
}

.card{
    margin-top:1rem;
    border: none;
    text-align:justify;
}


hr{
    border-top:2px solid #b4b4b4;
    width:85%;
    margin-top:0.3rem;
    margin-bottom: 1rem;
}

.start-container{
    height:15rem;
    background-color:#F2F2F2;
}
.row{
    margin-left: auto; 
    margin-right: auto;
}
.start-container h1{
    text-align: center;
    line-height: 240px;  
    margin-bottom:0px;
}
.btn-start{
    line-height: 240px;  
    margin-bottom:0px;
}
.btn-start-big{
    width:50%;
}

@media (max-width: 1200px) {
.heading{
    top:12%;
}
.heading h2{
    font-size:160%
}
.heading h5{
    font-size:120%
}
}
@media (max-width: 768px) {
    .heading h2{
        font-size:130%
    }
    .heading h5{
        font-size:90%
    }

}
@media (max-width: 576px) {
    .heading{
        display:none
    }
    .start-container h1{
        text-align: center;
        line-height: 120px;  
        margin-bottom:0px;
    }
    .btn-start{
        line-height: 90px;  
    }
}
`
