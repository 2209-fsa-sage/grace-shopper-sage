import axios from "axios";

// Actions
const ADD_PRODUCT = "ADD_PRODUCT";

// Action Creators
const _addProduct = (product) => {
    return {
        type: ADD_PRODUCT,
        product: product,
    };
};

// Thunks
export const addProduct = (product) => {
    return async (dispatch) => {
        const { data } = await axios.post();
        dispatch(_addProduct(data));
    };
};

// Initial State
const initialState = {
    product: {},
};

// Reducer

export default function productReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_PRODUCT:
            return (state = {
                ...state,
                product: action.product,
            });
        default:
            return state;
    }
}
