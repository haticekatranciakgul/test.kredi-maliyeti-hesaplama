import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  prepaidExpenses: 0,
  interestPayableOnLoans: 0,
  taxesOnLoanInterestPayable: 0,
  interestCostRelatedToLoanBlockage: 0,
  totalCost: 0,
  monthlyCostIvo: 0,
  annualCompoundCostIvo: 0,
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
