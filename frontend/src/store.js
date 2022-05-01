import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productReducer, productDetailsReducer, newReviewReducer, newProductReducer, removeProductReducer, productReviewsReducer, reviewReducer } from './reducers/productReducer';
import { userReducer, allUsersReducer, userDetailsReducer } from './reducers/userReducer';
import { profileReducer, forgotPasswordReducer } from './reducers/profileReducer';
import { cartReducer } from './reducers/cartReducer';
import { newOrderReducer, myOrdersReducer, orderDetailsReducer, allOrdersReducer, ordersReducer } from './reducers/orderReducer';

const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    removeProduct: removeProductReducer,
    allOrders: allOrdersReducer,
    order: ordersReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,
});

let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        shippingInfo: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {},
    }
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;