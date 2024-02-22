const { capitalize } = require('../helpers');

module.exports = (componentName) => {
    const schemaName = `${capitalize(componentName)}Schema`;

    return `import { createSlice } from "@reduxjs/toolkit";
import { ${schemaName} } from "../types/${schemaName}";

const initialState: ${schemaName} = {};

export const ${componentName}Slice = createSlice({
    name: "${componentName}",
    initialState,
    reducers: {},
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(, (state) => {
    //             state.error = undefined;
    //             state.isLoading = true;
    //         })
    //         .addCase(, (state) => {
    //             state.isLoading = false;
    //         })
    //         .addCase(, (state, action) => {
    //             state.isLoading = false;
    //             state.error = action.payload;
    //         });
    // },
})

export const { reducer: ${componentName}Reducer } = ${componentName}Slice;
export const { actions: ${componentName}Actions } = ${componentName}Slice;`;
};
