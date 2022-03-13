import React, { Fragment, useEffect } from 'react';
import './Products.css';
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../actions/productAction";
import Loader from "../Layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";

const Products = ({ match }) => {
    const dispatch = useDispatch();
    const { products, loading } = useSelector((state) => state.products);

    // const keyword = match.params.keyword;

    // useEffect(() => {
    //     dispatch(getProduct(keyword));
    // }, [dispatch, keyword]);
    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch]);

    return (
        <>
            {loading ? <Loader /> :
                <>
                    <h2 className="productsHeading">Products</h2>
                    <div className="products">
                        {products &&
                            products.map((product) => <ProductCard key={product._id} product={product} />)}
                    </div>
                </>}
        </>
    )
}

export default Products