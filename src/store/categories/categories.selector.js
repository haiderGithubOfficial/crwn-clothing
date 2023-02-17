import { createSelector } from "reselect";

const selectCategoryReducer = (state) => {
    console.log('selector 1');
    return state.categories
};

export const selectCategories = createSelector([selectCategoryReducer], (categorySlice) => {
    console.log('selector 2');
    return categorySlice.categories
})


export const selectCategoriesMap = createSelector([selectCategories], (categories) => {
    console.log('3 selector called');
    return categories.reduce((acc, category) => {
        const { title, items } = category;
        acc[title.toLowerCase()] = items;
        return acc;
    }, {})
}) 