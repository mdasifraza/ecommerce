import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    SAVE_SHIPPING_INFO
} from '../constants/cartConstant';

export const cartReducer = (state = { cartItems: [], shippingInfo: {} }, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;
            const isItemExist = state.cartItems.find((id) => id.product === item.product);
            if (isItemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((id) => id.product === isItemExist.product ? item : id)
                }
            }
            else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case REMOVE_CART_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((id) => id.product !== action.payload)
            }
        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload
            }
        default:
            return state;
    }
};