// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


// const productSlice = createSlice({
//   name: 'products',
//   initialState: {
//     products: [],
//     status: 'idle',
//     productDetails: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProducts.fulfilled, (state, action) => {
//         state.products = action.payload;
//       })
//       .addCase(fetchProductById.fulfilled, (state, action) => {
//         state.productDetails = action.payload;
//       })
//       .addCase(addProduct.fulfilled, (state, action) => {
//         state.products.push(action.payload);
//       })
//       .addCase(editProduct.fulfilled, (state, action) => {
//         const index = state.products.findIndex(p => p.id === action.payload.id);
//         if (index !== -1) {
//           state.products[index] = action.payload;
//         }
//       })
//       .addCase(removeProduct.fulfilled, (state, action) => {
//         state.products = state.products.filter(p => p.id !== action.payload);
//       });
//   },
// });

// export default productSlice.reducer;
