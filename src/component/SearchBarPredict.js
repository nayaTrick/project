import React, { useState } from 'react';
import { Form, FormControl, Button, Alert } from 'react-bootstrap';
import styled from 'styled-components';

export default function SearchBarPredict(props) {
    const [innerValue, setInnerValue] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = () => {
        if (innerValue.trim() === '') {
           handleErrorMessage("Please enter a stock symbol.",2000);
            return;
        }
        props.onSubmit(innerValue.trim());
        setError(null);
    };
    
    const handleErrorMessage = (message, duration) => {
        setError(message);
        setTimeout(() => {
            setError(null);
        }, duration);
    };

    return (
        <Styles>
            <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <FormControl className='input-stock'
                    type="text"
                    placeholder="Enter the stock symbol"
                    value={innerValue}
                    onChange={(e) => {
                        const { value } = e.target;
                        setInnerValue(value.toUpperCase()); // Convert to uppercase
                    }}
                />
                <Button className='Button-name' variant="outline-info" onClick={handleSubmit}>Predict</Button>
            </Form>
            {error && <Alert variant="danger" className="alert">{error}</Alert>}
        </Styles>
    );
}

const Styles = styled.div`
    form {
        display: flex;
       
        justify-content:center;
        
    }
    .input-stock{
        
        margin-right:100px;
        margin-top:20px;
        padding-top:5px;
        padding-bottom:5px;
    }
    .Button-name{
        margin-left:50px;
        margin-top:20px;
    }
    .alert {
        margin-top: 10px;
    }
    
    input {
        width: 300px;
        margin-right: 10px;
    }

    @media (max-width: 576px) {
        input {
            width: 250px;
        }
    }
`;
