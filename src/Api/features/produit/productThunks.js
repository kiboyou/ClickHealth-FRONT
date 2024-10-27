

// // Thunks pour les opérations CRUD
// export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
//   const response = await getProducts();
//   return response.data;
// });

// export const fetchProductById = createAsyncThunk('products/fetchProductById', async (id) => {
//   const response = await getProductById(id);
//   return response.data;
// });

// export const addProduct = createAsyncThunk('products/addProduct', async (newProduct) => {
//   const response = await createProduct(newProduct);
//   return response.data;
// });

// export const editProduct = createAsyncThunk('products/editProduct', async ({ id, product }) => {
//   const response = await updateProduct(id, product);
//   return response.data;
// });

// export const removeProduct = createAsyncThunk('products/removeProduct', async (id) => {
//   await deleteProduct(id);
//   return id;
// });
