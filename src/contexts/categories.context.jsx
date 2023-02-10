import { createContext, useEffect, useReducer } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";
import { createAction } from "../utils/reducer/reducer.utils";

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CATEGORIES_ACTION_TYPE = {
  SET_CATEGORIES: "SET_CATEGORIES",
};

const categoriesReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORIES_ACTION_TYPE.SET_CATEGORIES:
      return {
        ...state,
        categoriesMap: payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

const INITIAL_STATE = {
  categoriesMap: null,
};

export const CatogoriesProvider = ({ children }) => {
  const [{ categoriesMap }, dispatch] = useReducer(
    categoriesReducer,
    INITIAL_STATE
  );

  const setCategoriesMap = (categoryMap) => {
    dispatch(createAction(CATEGORIES_ACTION_TYPE.SET_CATEGORIES, categoryMap));
  };

  const value = { categoriesMap };
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoryMap);
    };

    getCategoriesMap();
  }, []);
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
