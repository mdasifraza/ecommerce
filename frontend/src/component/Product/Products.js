import React, { useEffect, useState } from 'react';
import './Products.css';
import { useSelector, useDispatch } from 'react-redux';
import { getProduct } from '../../actions/productAction';
import Loader from '../Layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import Pagination from 'react-js-pagination';
import MetaData from '../Layout/MetaData';
import { useParams } from 'react-router-dom';

const Products = () => {
    const dispatch = useDispatch();

    const { keyword } = useParams();

    const [currentPage, setCurrentPage] = useState(1);

    const { products, loading, productsCount,
        resultPerPage, filteredProductsCount, } = useSelector((state) => state.products);

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    };

    let count = filteredProductsCount;
    // let count = productsCount;
    console.log({ count, resultPerPage })

    useEffect(() => {
        dispatch(getProduct(keyword, currentPage));
    }, [currentPage, dispatch, keyword]);

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