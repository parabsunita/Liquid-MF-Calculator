// src/redux/reducers/navReducer.js
const initialState = {
  navData: [],
  mutualFundNames: [],
  schemeNames: [],
};

const navReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NAV_DATA":
      return {
        ...state,
        navData: action.payload,
      };
    case "SET_MUTUAL_FUND_NAMES":
      return {
        ...state,
        mutualFundNames: action.payload,
      };
    case "SET_SCHEME_NAMES":
      return {
        ...state,
        schemeNames: action.payload,
      };
    default:
      return state;
  }
};

export default navReducer;
