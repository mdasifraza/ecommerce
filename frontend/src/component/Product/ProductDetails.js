import React, { useEffect, useState } from 'react';
import './ProductDetails.css';
import Carousel from 'react-material-ui-carousel';
import { useSelector, useDispatch } from 'react-redux';
import { getProductDetails, clearErrors } from '../../actions/productAction';
import { useParams } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import ReviewCard from './ReviewCard.js';
import Loader from '../Layout/Loader/Loader';
import { useAlert } from 'react-alert';
import { addItemsToCart } from '../../actions/cartAction';
import MetaData from "../Layout/MetaData";

const ProductDetails = () => {
  const { id } = useParams();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.productDetails);

  const [quantity, setQuantity] = useState(1);

  const increasequantity = () => {
    if (product.stock <= quantity) return;
    let qty = quantity + 1;
    setQuantity(qty);
  }

  const decreasequantity = () => {
    if (quantity <= 1) return;
    let qty = quantity - 1;
    setQuantity(qty);
  }

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item Added To Cart");
  }

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id))
  }, [dispatch, id, error, alert]);

  const options = {
    edit: false,
    color: "rgb(20, 20, 20, 0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  }

  return (
    <>
      <MetaData title={product.name} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="ProductDetails">
            <div>
              <Carousel>
                {product.images && product.images.map((item, i) => (
                  <img
                    className="CarouselImage"
                    key={item.url}
                    src={item.url}
                    alt={`${i} Slide`}
                  />
                ))}
              </Carousel>
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>

              <div className="detailsBlock-2">
                <ReactStars {...options} />
                <span>({product.numOfReviews}Reviews)</span>
              </div>

              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreasequantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increasequantity}>+</button>
                  </div>
                  <button onClick={addToCartHandler}>Add to Cart</button>
                </div>
                <p>
                  Status: <b className={product.Stock < 1 ? "redColor" : "greenColor"} >
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              <button className="submitReview" >Submit Review</button>
            </div>
          </div>
          <h3 className="reviewsHeading">Reviews</h3>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => <ReviewCard review={review} />)}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </>
      )}</>
  )
}

export default ProductDetails