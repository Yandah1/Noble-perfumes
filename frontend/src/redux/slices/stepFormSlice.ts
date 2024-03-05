import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface MultiStepFormState {
  currentStep: number;
  formData: {};
}

const initialState: MultiStepFormState = { currentStep: 0, formData: {} };

const multiStepFormSlice = createSlice({
  name: "stepForm",
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    updateFormData: (state, action: PayloadAction<FormData>) => {
      state.formData = {
        ...state.formData,
        ...action.payload
      };
    }
  }
});

export const { setCurrentStep, updateFormData } = multiStepFormSlice.actions;
export default multiStepFormSlice.reducer;