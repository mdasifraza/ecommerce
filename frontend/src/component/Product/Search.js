import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Search.css';

const Search = () => {
    const [keyword, setKeyword] = useState("");
    const history = useNavigate();

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        console.log(e,keyword)
        if (keyword.trim()) {
            history(`/products/${keyword}`);
        }
    }

    return (
        <>
            <form className="searchBox" onSubmit={searchSubmitHandler}>
                <input type="text"
                    placeholder="Search a Product"
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <input type="submit" value="Search" />
            </form>
        </>
    )
}

export default Search