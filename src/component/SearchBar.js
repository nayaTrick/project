import React, { useState } from 'react'
import { Form, FormControl, Button, Col, Row, Alert } from 'react-bootstrap'
import styled from 'styled-components'

export default function SearchBar(props) {
    const [stock, setStock] = useState(true)
    const [innerValue, setinnerValue] = useState('')
    const [error, setError] = useState(null)

    //to search user enter or click submit button
    const HandleSubmit = () => { props.onSubmit(innerValue, stock) }

    //function to handle when user click enter
    const onKeyPress = (e) => {
        //when there is no error (numbers input by user)
        if (e.which === 13 && !error) {
            HandleSubmit();
        }
    }

    //function to get which form to use (text or drop down)
    function getForm() {
        if (stock) {
            return (
                <FormControl
                    type="text"
                    id="search"
                    placeholder="Enter the stock symbol"
                    name="search"
                    onChange={(x) => {
                        const { value } = x.target;
                        //check if there is number or special chars
                        if (/[^a-zA-Z\s]/.test(value)) {
                            setError("There is no stock symbol with number or special characters in the data. Please use only alphabet for searching the stock symbol.");
                        }
                        else {
                            setError(null)
                        }
                        setinnerValue(value);
                    }}
                    //to handle enter
                    onKeyPress={onKeyPress}
                />
            )
        } else {
            return (
                < Form.Group controlId="exampleForm.ControlSelect1" >
                    <Form.Control
                        as="select"
                        onChange={(e) => setinnerValue(e.target.value)}>
                        <option disabled selected value> -- Select Industry -- </option>
                        <option value="Health Care">Health Care</option>
                        <option value="Industrials">Industrials</option>
                        <option value="Information Technology">Information Technology</option>
                        <option value="Consumer Staples">Consumer Staples</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Financials">Financials</option>
                        <option value="Real Estate">Real Estate</option>
                        <option value="Materials">Materials</option>
                        <option value="Energy">Energy</option>
                        <option value="Telecommunication Services">Telecommunication Services</option>
                    </Form.Control>
                </Form.Group >
            )
        }
    }
    return (
        <Styles>
            <Row>
                <Col md={4} xs={12}><span className="radio-title"> Search By:</span></Col>
                <Col md={4} xs={12}>
                    <label htmlFor="stocksearch">
                        <input
                            type="radio"
                            id="stocksearch"
                            name="search"
                            className='radioinput'
                            defaultChecked={true}
                            onClick={() =>
                                setStock(true)
                            }
                        ></input>
                        <span className="radio"></span>
                        <span className="label">Stock Symbol</span>
                    </label>
                </Col>
                <Col md={4} xs={12}>
                    <label htmlFor="indsearch">
                        <input
                            type="radio"
                            id="indsearch"
                            name="search"
                            className='radioinput'
                            onClick={() => {
                                setStock(false);
                                setinnerValue('')
                                setError(null)
                            }
                            }
                        ></input>
                        <span className="radio"></span>
                        <span className="label">Industry Name</span>
                    </label>
                </Col>

            </Row>
            {/* for text input (text box) */}
            <Row className='search-barbtn'>
                <Col sm={7} xs={12}>
                    {/* Text form for stock search, dropdown menu for industry search */}
                    {getForm()}
                </Col>
                <Col sm={4} xs={12} className="button-search">
                    {/* for search button */}
                    <Button
                        variant="outline-info"
                        id="search-button"
                        //disable button when there is error
                        disabled={error != null}
                        onClick={HandleSubmit}

                    >Search</Button>
                </Col>
            </Row>
            {error != null ? <Alert variant="danger" className="alert">{error}</Alert> : null
            }
        </Styles >
    )
}

const Styles = styled.div`
.radio-title{
    padding-left:40px;
    letter-spacing: 1px;
}
label {
    position: relative;
    padding-left: 2rem;
    cursor: pointer;
    color: #555;
    letter-spacing: 1px;
    padding-right: 3rem;
    &:hover input:not(:checked) ~ .radio {
      opacity: 0.7;
    }
  }
  .radioinput {
    position: absolute;
    cursor: pointer;
    height: 0;
    width: 0;
    left: -2000px;

    &:checked {
      ~ .radio {
        background-color: #17A2B8;
        transition: background .3s;
        &::after {
          opacity: 1;
        }
      }
      ~ .label {
        color: #17A2B8;
        span {
          animation: bulge .5s forwards;
        }
      }
    }
  }
}
.radio {
  position: absolute;
  top: 0.2rem;
  left: 0;
  height: 1rem;
  width: 1rem;
  background: #17A2B8;
  border-radius: 50%;
  &::after {
    content: '';
    position: absolute;
    opacity: 0;
    top: .25rem;
    left: .25rem;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: #fff;
  }
}
#search{
    width:350px;
    height:38px;
}
.search-barbtn{
    margin-left:25px;
}
.button-search{
    margin-left:40px;
}
div{
    margin-bottom:10px;
}
.alert{
    width:95%;
}
@media (max-width: 768px) {
    .radio-title{
        letter-spacing: 0px;
    }
    label{
        letter-spacing: 0px;
    }



}
@media (max-width: 576px) {
    .radio-title{
        letter-spacing: 0px;
        padding-right:1rem;
        padding-left:0px;
        font-size:80%;

    }
    label{
        letter-spacing: 0px;
        padding-left:1.1rem;
        margin-right:0px;
        font-size:80%;
    }
    .search-barbtn{
        margin-left:0px;
    }
    .button-search{
        margin-left:0px;
    }
    #search{
        width:300px;
    }

}
`
