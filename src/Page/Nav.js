import React from 'react'
import logo from '../img/logo.PNG'
import { Nav, Navbar } from 'react-bootstrap'
import styled from 'styled-components'



export default function NavBar(props) {
    return (
        <Styles>
            <Navbar className='color-nav' collapseOnSelect expand="md" fixed='top'>
                <Navbar.Brand href="/" className="nav-brand">
                    <img
                        alt=""
                        src={logo}
                        width="190"
                        height="75"
                        className="d-inline-block align-top logo"
                    />{' '}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="nav-title ml-auto">
                        <Nav.Link href='/'>Home</Nav.Link>
                        <Nav.Link href="/search">Search</Nav.Link>
                        <Nav.Link href="/filter">Filter</Nav.Link>
                        <Nav.Link href="/predict">Predict</Nav.Link>
                        
                    </Nav>
                </Navbar.Collapse>
            </Navbar >
        </Styles>
    )
}


const Styles = styled.div`
.color-nav{
    background-color: #004050;
}
.button-toggle{
    color:#EFEFEF;
}

.navbar-light .navbar-toggler-icon{
    color:white;
}
#responsive-navbar-nav a{
    color:#EFEFEF;
}
#responsive-navbar-nav a:hover{
    color: #0097a7;
}

.nav-brand{
    margin-left: 30px;
}  

@media (max-width: 768px) {
.logo{
    width:150px;
    length:50px;
}
}
@media (max-width: 576px) {
    .logo{
        width:120px;
        height:40px;
    }
    .nav-brand{
        margin-left: 15px;
    }  
}

`;