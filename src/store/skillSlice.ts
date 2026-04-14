import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Định nghĩa kiểu dữ liệu cho 1 kỹ năng
export type Skill = {
  id: string;
  name: string;
};

const initialState: Skill[] = [
  { id: '1', name: 'HTML' }, { id: '2', name: 'CSS' },
  { id: '3', name: 'C#' }, { id: '4', name: 'Angular' },
  { id: '5', name: 'ReactJS' }, { id: '6', name: 'Next' },
  { id: '7', name: 'Asp.Net MVC' }
];

const skillSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    // Hành động thêm kỹ năng mới
    addSkill: (state, action: PayloadAction<Skill>) => {
      state.push(action.payload);
    }
  }
});

export const { addSkill } = skillSlice.actions;
export default skillSlice.reducer;