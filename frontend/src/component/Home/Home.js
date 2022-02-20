import React, { useEffect } from 'react';
import { CgMouse } from 'react-icons/cg';
import './Home.css';
import Product from './Product.js';
import MetaData from '../Layout/MetaData';
import { getProduct } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../Layout/Loader/Loader';
import { useAlert } from 'react-alert';

// const product = {
//     name: "Blue T-Shirt",
//     images: [{ url: "https://picsum.photos/300/400" }],
//     price: "Rs 3000",
//     _id: "asif123",
// }

const Home = () => {
    const dispatch = useDispatch();
    const { loading, error, products, productsCount } = useSelector(state => state.products);

    useEffect(() => {
        if (error) {
            return alert.error(error);
        }
        dispatch(getProduct());
    }, [dispatch, error]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <MetaData title="Ecommerce" />
                    <div className="banner">
                        <p>Welcome to Ecommerce</p>
                        <h1>Find Amazing Products Below</h1>
                        <a href="#container">
                            <button>
                                Scroll <CgMouse />
                            </button>
                        </a>
                    </div>
                    <h2 className="homeHeading">Featured Products</h2>
                    <div className="container" id="container">
                        {products && products.map((product, index) => (
                            <Product product={product} key={index} />
                        ))}
                        {/* <Product product={product} />*/}
                    </div>
                </>
            )}
        </>
    )
}

export default Home