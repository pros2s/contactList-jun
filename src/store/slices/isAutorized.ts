import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';


interface IsAutorizedState {
  isAutorized: boolean;
}

const initialState: IsAutorizedState = {
  isAutorized: false,
};

export const isAutorizedSlice = createSlice({
  name: 'isAutorized',
  initialState,
  reducers: {
    trueAutorization(state) {
      state.isAutorized = true;
    },
    falseAutorization(state) {
      state.isAutorized = false;
    }
  },
});

export const isAutorizedSelelector = (state: RootState) => state.isAutorizedReducer;
export const { trueAutorization, falseAutorization } = isAutorizedSlice.actions;


export default isAutorizedSlice.reducer;
