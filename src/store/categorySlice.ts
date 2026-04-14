import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// 1. Tạo hàm Thunk để gọi API
// LƯU Ý: Thay đường link URL dưới đây bằng đường link MockAPI của bạn!
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const response = await fetch('https://69de7d42d6de26e11927fed9.mockapi.io/categories');
    const data = await response.json();
    return data;
  }
);

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    list: [],
    loading: false, // Trạng thái đang tải
    error: null as string | null,
  },
  reducers: {},
  // Xử lý các trạng thái của API (Đang gọi, Thành công, Thất bại)
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload; // Nạp dữ liệu từ API vào Redux
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Lỗi tải dữ liệu';
      });
  },
});

export default categorySlice.reducer;