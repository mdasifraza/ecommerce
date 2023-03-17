import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Search.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { AiOutlineSearch } from 'react-icons/ai';

const Search = () => {
    const [keyword, setKeyword] = useState("");
    const history = useNavigate();

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        console.log(e, keyword)
        if (keyword.trim()) {
            history(`/products/${keyword}`);
        }
    }

    return (
        <>
            {/* <form className="searchBox" onSubmit={searchSubmitHandler}>
                <input type="text"
                    placeholder="Search a Product"
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <input type="submit" value="Search" />
            </form> */}
            <Form className="d-flex" onSubmit={searchSubmitHandler}>
                <Form.Control
                    type="search"
                    placeholder="Search a Product"
                    className="me-2"
                    aria-label="Search"
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <Button type='submit'><AiOutlineSearch size={28} color="white" /></Button>
            </Form>
        </>
    )
}

export default Search