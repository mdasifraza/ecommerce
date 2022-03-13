import React from 'react';
import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { AiOutlineSearch, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai'

const Header = () => {
    return (
        <Navbar bg="primary" expand="lg">
            <Container fluid>
                <Navbar.Brand href="#">Ecommerce</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/products">Product</Nav.Link>
                        <NavDropdown title="Link" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action5">
                                Something else here
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#">Contact</Nav.Link>
                        <Nav.Link href="#">About</Nav.Link>
                    </Nav>
                    {/* <Form className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form> */}
                    <Nav.Link href="/search"><AiOutlineSearch size={28} color="white"/></Nav.Link>
                    <Button><AiOutlineShoppingCart size={28} /></Button>
                    <Nav.Link href="/login"><AiOutlineUser size={28} color="white"/></Nav.Link>
                    {/* <Button><AiOutlineUser size={28} /></Button> */}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header