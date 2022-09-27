import React, { useEffect, useState } from 'react';
import { Navbar, Container, Nav, Badge } from 'react-bootstrap';
import { AiOutlineSearch, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import UserOptions from './UserOptions';
import { useSelector } from 'react-redux';
import Search from '../../Product/Search';


const Header = () => {
    const { isAthenticated, user } = useSelector(state => state.user);
    const { cartItems } = useSelector(state => state.cart);
    const [numberOfItems, setNumberOfItems] = useState();

    useEffect(() => {
        if (cartItems.length !== 0) {
            const count = cartItems.reduce((acc, item) =>
                acc + item.quantity, 0
            )
            setNumberOfItems(count);
        }
        else {
            setNumberOfItems(0);
        }

    }, [cartItems, cartItems.length])

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
                        <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                        <Nav.Link as={Link} to="/about">About</Nav.Link>
                    </Nav>
                    {/* <Nav.Link as={Link} to="/search">
                        <AiOutlineSearch size={28} color="white" />
                    </Nav.Link> */}
                    <Search />
                    <Nav.Link as={Link} to="/cart">
                        <AiOutlineShoppingCart size={28} color="white" />
                        {<Badge bg="primary">{numberOfItems !== 0 ? numberOfItems : null}</Badge>}
                    </Nav.Link>
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