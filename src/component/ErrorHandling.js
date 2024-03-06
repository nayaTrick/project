import React from 'react'
import { Alert } from 'react-bootstrap'

export default function ErrorHandling(props) {
    //handling error when user input an unidentified stock symbol
    if (!props.error & props.data.length === 0) {
        return (
            <Alert variant="danger">It looks like you have entered an unidentified stock symbol. Please re-enter the stock symbol or search by industry name.</Alert>
        )
    }
    //handling error when user input an unidentified stock symbol
    if (props.error) {
        return (
            <Alert variant="danger">We have a trouble in loading the data. Please check your internet connection and VPN, then reload the page.</Alert>
        )
    }
    return (null)
}