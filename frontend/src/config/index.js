// export const baseUrl = "http://localhost:4000"
// export const baseUrl = "https://ecommerce-backend-apis.onrender.com"
export const stripeKey = "pk_test_51LheYxSJSo8OZyhV0VmvU4h8hpsSJKWc7y1P0Ejv7lW0TpywFmqqpLVAXU0bnQ4slQ16B5o7i8bBJCzJztqSEAxd00n1bruODH"

export const STORAGE = "ecom"

let baseUrl = ''

let appStage = process.env.REACT_APP_STAGE

if (appStage == 'dev') {
    baseUrl = 'http://localhost:4000'
} else if (appStage == 'prod') {
    baseUrl = 'https://ecommerce-backend-apis.onrender.com'
}

export const API_BASE_URL = baseUrl

export const API_URL = {
    PRODUCTS: {
        GET_ALL_PRODUCTS: `${baseUrl}/api/v1/products`
    }
}