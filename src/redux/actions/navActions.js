// src/redux/actions/navActions.js
export const setNavData = (navData) => ({
  type: "SET_NAV_DATA",
  payload: navData,
});

export const setMutualFundNames = (mutualFundNames) => ({
  type: "SET_MUTUAL_FUND_NAMES",
  payload: mutualFundNames,
});

export const setSchemeNames = (schemeNames) => ({
  type: "SET_SCHEME_NAMES",
  payload: schemeNames,
});

export const fetchNavData = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://www.amfiindia.com/spages/NAVAll.txt?t=18022020035513"
      );
      const data = await response.text();

      // Extract mutual fund names and scheme names
      const mutualFundAndSchemeNames = data.split("\n").map((line) => {
        const columns = line.split(" ");
        return { mutualFund: columns[0], scheme: columns[1] };
      });

      // Filter out empty strings
      const filteredMutualFundNames = mutualFundAndSchemeNames
        .map((entry) => entry.mutualFund)
        .filter(Boolean);
      const filteredSchemeNames = mutualFundAndSchemeNames
        .map((entry) => entry.scheme)
        .filter(Boolean);

      dispatch(setNavData(filteredMutualFundNames));
      dispatch(setMutualFundNames(filteredMutualFundNames));
      dispatch(setSchemeNames(filteredSchemeNames));
    } catch (error) {
      console.error("Error fetching NAV data:", error);
    }
  };
};
