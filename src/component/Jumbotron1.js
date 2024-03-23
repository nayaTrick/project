import React from 'react'
import { Jumbotron, Container } from 'react-bootstrap'
import jumbo1 from '../img/jumbo1.jpg';
import jumbo3 from '../img/jumbo3.jpg';
import styled from 'styled-components'

export default function Jumbotron1(props) {
    if (props.searchpage) {
        return (
            <Styles>
                <Jumbotron fluid className='jumbo'>
                    <Container>
                        <h2 className='jumbo-title'>The fastest way to follow the stock market</h2>
                        <h4 className='jumbo-explain'>
                            Bringing convenience by providing information with just one click.
                        </h4>
                    </Container>
                </Jumbotron>
            </Styles>
        )
    } else  {
        return (
            <Styles>
                <Jumbotron fluid className='jumbo2'>
                    <Container>
                        <h2 className='jumbo-title2'>Monitor the changes in stock price quickly</h2>
                        <h4 className='jumbo-explain2'>
                            Bringing convenience by providing information with just one click.
                        </h4>
                    </Container>
                </Jumbotron>
            </Styles>
        )
    }
}

const Styles = styled.div`
.jumbo{
    margin-top:100px;
    height:250px;
    background: url(${jumbo1})fixed bottom;
    opacity: 0.8;
}
.jumbo-title{
    color:#F2F2F2;
    background-color:#8F786B;
    display: inline-block;
}
.jumbo-explain{
    color:#F2F2F2;
    background-color:#B38100;
    display: inline-block;
    margin-top: 10px
}
.jumbo2{
    margin-top:100px;
    height:250px;
    background: url(${jumbo3}) fixed bottom;
    opacity: 1;
}
.jumbo-title2{
    color:#F2F2F2;
    background-color:#30475E;
    display: inline-block;
}
.jumbo-explain2{
    color:#F2F2F2;
    background-color:#4D451C;
    display: inline-block;
    margin-top: 10px
}
.container{
    padding-left: 130px;
}
@media (max-width: 768px) {
    .container{
        padding-left: 40px;
    }  
    .jumbo-title{
        font-size:160%;
    }
    jumbo-title2{
        font-size:160%;
    }
    .jumbo-explain{
        font-size:120%;
    }
    jumbo-explain2{
        font-size:120%;
    }
@media (max-width: 576px) {
    .jumbo{
        height:200px;
    }
    .container{
        padding-left: 25px;
    }  
    .jumbo-title{
        font-size:100%;
    }
    .jumbo-title2{
        font-size:100%;
    }
    .jumbo-explain{
        font-size:80%;
    }
    .jumbo-explain2{
        font-size:80%;
    }
    .jumbo{
        margin-top:60px;
    }
    .jumbo2{
        margin-top:60px;
    }
}
}
`;