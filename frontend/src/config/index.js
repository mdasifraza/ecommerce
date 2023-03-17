export const baseUrl = "http://localhost:4000"

export const API_URL = {
    PRODUCTS: {
        GET_ALL_PRODUCTS: `${baseUrl}/api/v1/products`,
        GET_ADMIN_PRODUCTS: `${baseUrl}/api/v1/admin/products`,
        CREATE_PRODUCTS: `${baseUrl}/api/v1/admin/product/new`,
        UPDATE_PRODUCTS: `${baseUrl}/api/v1/admin/product/:id`,
        REMOVE_PRODUCTS: `${baseUrl}/api/v1/admin/product/:id`,
        GET_PRODUCT_DETAILS: `${baseUrl}/api/v1/products/:id`,
        CREATE_REVIEW: `${baseUrl}/api/v1/review`,
        GET_REVIEW: `${baseUrl}/api/v1/reviews`,
        DELETE_REVIEW: `${baseUrl}/api/v1/reviews`,
    },
    ORDER: {
        CREATE_ORDER: `${baseUrl}/api/v1/order/new`,
        UPDATE_ORDER: `${baseUrl}/api/v1/admin/order/:id`,
        DELETE_ORDER: `${baseUrl}/api/v1/admin/order/:id`,
        ME_ORDER: `${baseUrl}/api/v1/orders/me`,
        GET_ALL_ORDERS: `${baseUrl}/api/v1/admin/orders`,
        GET_ORDER_DETAILS: `${baseUrl}/api/v1/orderdetail/:id`,
    },
    PROFILE: {
        UPDATE_PROFILE: `${baseUrl}/api/v1/me/update`,
        UPDATE_PASSWORD: `${baseUrl}/api/v1/password/update`,
        FORGOT_PASSWORD: `${baseUrl}/api/v1/password/forgot`,
        RESET_PASSWORD: `${baseUrl}/api/v1/password/reset/:token`,
        UPDATE_USER: `${baseUrl}/api/v1/admin/user/:id`,
        DELETE_USER: `${baseUrl}/api/v1/admin/user/:id`,
    },
    USER: {
        LOGIN: `${baseUrl}/api/v1/login`,
        REGISTER: `${baseUrl}/api/v1/register`,
        ME: `${baseUrl}/api/v1/me`,
        LOGOUT: `${baseUrl}/api/v1/logout`,
        GET_ALL_USERS: `${baseUrl}/api/v1/admin/users`,
        GET_USER_DETAILS: `${baseUrl}/api/v1/admin/user/:id`,
    }
}