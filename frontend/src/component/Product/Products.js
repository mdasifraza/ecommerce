import React, { useEffect, useState } from 'react';
import './Products.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProduct } from '../../actions/productAction';
import Loader from '../Layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import Pagination from 'react-js-pagination';
import MetaData from '../Layout/MetaData';
import { useParams } from 'react-router-dom';
import { Slider, Typography } from '@material-ui/core';

const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
];

const Products = () => {
    const dispatch = useDispatch();

    const { keyword } = useParams();

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 2500000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);

    const {
        products,
        loading,
        error,
        productsCount,
        resultPerPage,
        filteredProductsCount, } = useSelector((state) => state.products);

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    };

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    };
    let count = filteredProductsCount;

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        dispatch(getProduct(keyword, currentPage, price, category, ratings));
    }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);

    return (
        <>
            <MetaData title="Products" />
            {loading ? <Loader /> :
                <>
                    <h2 className="productsHeading">Products</h2>
                    <div className="products">
                        {products &&
                            products.map((product) => <ProductCard key={product._id} product={product} />)}
                    </div>

                    <div className="filterBox">
                        <Typography>Price</Typography>
                        <Slider
                            value={price}
                            onChangeCommitted={priceHandler}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            min={0}
                            max={2500000}
                        />

                        {/* <Slider aria-label="Volume" value={price} onChange={priceHandler} /> */}

                        <Typography>Categories</Typography>
                        <ul className="categoryBox">
                            {categories.map((category) => (
                                <li
                                    className="category-link"
                                    key={category}
                                    onClick={() => setCategory(category)}
                                >
                                    {category}
                                </li>
                            ))}
                        </ul>

                        <fieldset>
                            <Typography component="legend">Ratings Above</Typography>
                            <Slider
                                value={ratings}
                                onChangeCommitted={(e, newRating) => {
                                    setRatings(newRating);
                                }}
                                aria-labelledby="continuous-slider"
                                valueLabelDisplay="auto"
                                min={0}
                                max={5}
                            />
                        </fieldset>
                    </div>

                    {resultPerPage < count && (
                        <div className="paginationBox">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resultPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText="Next"
                                prevPageText="Prev"
                                firstPageText="1st"
                                lastPageText="Last"
                                itemClass="page-item"
                                linkClass="page-link"
                                activeClass="pageItemActive"
                                activeLinkClass="pageLinkActive"
                            />
                        </div>
                    )}
                </>
            }
        </>
    )
}

export default Products