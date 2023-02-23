import { CATEGORIES_ACTION_TYPE } from "./categories.types";
import { createAction } from "../../utils/reducer/reducer.utils";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";




const fetchCategoriesStart = () => createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START)
const fetchCategoriesSuccess = (categoriesArray) => createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS, categoriesArray)
const fetchCategoriesFailed = (error) => createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_FAILED, error)


export const fetchCategoriesAsync = async (dispatch) => {
    dispatch(fetchCategoriesStart());
    try {
        const categoryArray = await getCategoriesAndDocuments();
        dispatch(fetchCategoriesSuccess(categoryArray));
    } catch (error) {
        dispatch(fetchCategoriesFailed(error));
    }
}