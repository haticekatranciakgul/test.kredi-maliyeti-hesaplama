import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  prepaidExpenses: null,
  interestPayableOnLoans: null,
  taxesOnLoanInterestPayable: null,
  interestCostRelatedToLoanBlockage: null,
  totalCost: null,
  monthlyCostIvo: null,
  annualCompoundCostIvo: null,
};

const costSlice = createSlice({
  name: 'costs',
  initialState,
  reducers: {
    setPrepaidExpenses: (state, action) => {
      state.prepaidExpenses = action.payload;
    },
    setInterestPayableOnLoans: (state, action) => {
      state.interestPayableOnLoans = action.payload;
    },
    setTaxesOnLoanInterestPayable: (state, action) => {
      state.taxesOnLoanInterestPayable = action.payload;
    },
    setInterestCostRelatedToLoanBlockage: (state, action) => {
      state.interestCostRelatedToLoanBlockage = action.payload;
    },
    setTotalCost: (state, action) => {
      state.totalCost = action.payload;
    },
    setMonthlyCostIvo: (state, action) => {
      state.monthlyCostIvo = action.payload;
    },
    setAnnualCompoundCostIvo: (state, action) => {
      state.annualCompoundCostIvo = action.payload;
    },
  },
});

export const { 
  setPrepaidExpenses, 
  setInterestPayableOnLoans, 
  setTaxesOnLoanInterestPayable, 
  setInterestCostRelatedToLoanBlockage, 
  setTotalCost, 
  setMonthlyCostIvo, 
  setAnnualCompoundCostIvo 
} = costSlice.actions;

export default costSlice.reducer;
