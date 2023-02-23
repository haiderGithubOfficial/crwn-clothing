import { CATEGORIES_ACTION_TYPE } from "./categories.types";

const INITIAL_STATE = {
    isLoading: false,
    categories: [],
    error: null
};


export const categoriesReducer = (state = INITIAL_STATE, action = {}) => {

    const { type, payload } = action;

    switch (type) {
        case CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START:
            return {
                ...state,
                isLoading: true,
            };
        case CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                categories: payload
            };
        case CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload
            };
        default:
            return state;
    }
};

