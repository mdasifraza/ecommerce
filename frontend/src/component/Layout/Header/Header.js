import React from 'react';
import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { AiOutlineSearch, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import UserOptions from './UserOptions';
import { useSelector } from 'react-redux';


const Header = () => {
    const { isAthenticated, user } = useSelector(state => state.user)

    return (
        <Navbar bg="primary" expand="lg">
            <Container fluid>
                <Navbar.Brand to="/">Ecommerce</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/products">Product</Nav.Link>
                        <NavDropdown title="Link" id="navbarScrollingDropdown">
                            <NavDropdown.Item to="#action3">Action</NavDropdown.Item>
                            <NavDropdown.Item to="#action4">Another action</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item to="#action5">
                                Something else here
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link as={Link} to="#">Contact</Nav.Link>
                        <Nav.Link as={Link} to="#">About</Nav.Link>
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
                    <Nav.Link as={Link} to="/search">
                        <AiOutlineSearch size={28} color="white" />
                    </Nav.Link>
                    <Button>
                        <AiOutlineShoppingCart size={28} />
                    </Button>
                    {!isAthenticated ?
                        (<Nav.Link as={Link} to="/login">
                            <AiOutlineUser size={28} color="white" />
                        </Nav.Link>) :
                        (<UserOptions user={user} />)}
                    {/* <Button><AiOutlineUser size={28} /></Button> */}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header