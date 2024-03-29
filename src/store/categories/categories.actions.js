import { CATEGORIES_ACTION_TYPE } from "./categories.types";
import { createAction } from "../../utils/reducer/reducer.utils";

export const fetchCategoriesStart = () => createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START)
export const fetchCategoriesSuccess = (categoriesArray) => createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS, categoriesArray)
export const fetchCategoriesFailed = (error) => createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_FAILED, error)

