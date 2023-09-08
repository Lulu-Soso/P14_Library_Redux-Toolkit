import { createSlice } from "@reduxjs/toolkit";

const safeParse = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || null;
  } catch (error) {
    console.warn(`Error parsing ${key} from localStorage:`, error);
    return null;
  }
};

const employeesDataFromLocalStorage = safeParse("employees");
const employeeInfoFromLocalStorage = safeParse("employeeInfo");

const initialState = {
  employeesData: employeesDataFromLocalStorage || [],
  employeeInfo: employeeInfoFromLocalStorage || null,
  error: null,
  filteredResults: [],
  searchValue: "",
  // pagination: {
  //   currentPage: 1,
  //   entriesToShow: 10,
  // },
};

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    // setEmployeesData: (state, action) => {
    setEmployeesData: (state, { payload }) => {
      // state.employees = action.payload;
      state.employeesData = payload;
      localStorage.setItem("employees", JSON.stringify(state.employeesData));
    },
    addEmployee: (state, { payload }) => {
      state.employeesData.push(payload);
      localStorage.setItem("employeeInfo", JSON.stringify(payload));
      localStorage.setItem("employees", JSON.stringify(state.employeesData));
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
    setEntriesToShow: (state, { payload }) => {
      state.pagination.entriesToShow = payload;
    },
    // setSearch: (state, { payload }) => {
    //   state.searchValue = payload;
    // },
    setCurrentPage: (state, { payload }) => {
      state.pagination.currentPage = payload;
    },
    filterEmployees: (state) => {
      if (state.searchValue) {
        const searchValueLowerCase = state.searchValue.toLowerCase();
        state.filteredResults = state.employeesData.filter(employee =>
          Object.values(employee).some(value =>
            String(value).toLowerCase().includes(searchValueLowerCase)
          )
        );
      } else {
        state.filteredResults = [];
      }
    },
    setSearch: (state, { payload }) => {
      state.searchValue = payload;
      // After setting the search value, we filter the employees
      employeesSlice.caseReducers.filterEmployees(state);
    },
  },
});

export const {
  setEmployeesData,
  addEmployee,
  setError,
  setCurrentPage,
  setEntriesToShow,
  setSearch,
} = employeesSlice.actions;
export default employeesSlice.reducer;
