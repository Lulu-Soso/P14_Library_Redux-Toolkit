import { createSlice } from "@reduxjs/toolkit";

// const safeParse = (key) => {
//   try {
//     return JSON.parse(localStorage.getItem(key)) || null;
//   } catch (error) {
//     console.warn(`Error parsing ${key} from localStorage:`, error);
//     return null;
//   }
// };

// const employeesDataFromLocalStorage = safeParse("employeesData");
// const employeeInfoFromLocalStorage = safeParse("employeeInfo");

const initialState = {
  // employeesData: employeesDataFromLocalStorage || [],
  employeesDataNoCreatedAt:  [],
  employeesData:  [],
  employeeInfo: {},
  // employeeInfo: employeeInfoFromLocalStorage || null,
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
    setEmployeesDataNoCreatedAt: (state, { payload }) => {
      state.employeesDataNoCreatedAt = payload;
      localStorage.setItem("employeesDataNoCreatedAt", JSON.stringify(state.employeesDataNoCreatedAt));
    },
    // setEmployeesData: (state, action) => {
    setEmployeesData: (state, { payload }) => {
      // state.employees = action.payload;
      state.employeesData = payload;
      localStorage.setItem("employeesData", JSON.stringify(state.employeesData));
    },
    addEmployee: (state, { payload }) => {
      state.employeesData.push(payload);
      localStorage.setItem("employeeInfo", JSON.stringify(payload));
      localStorage.setItem("employeesData", JSON.stringify(state.employeesData));
    },
    updateEmployee: (state, { payload }) => {
      state.employeesData = state.employeesData.map((employee) =>
        employee.id === payload.id ? payload : employee
      );
      localStorage.setItem("employeeInfo", JSON.stringify(payload.id));
      localStorage.setItem("employeesData", JSON.stringify(state.employeesData));
    },
    deleteEmployee: (state, { payload }) => {
      state.employeesData = state.employeesData.filter(
        (employee) => employee.id !== payload 
      );
      localStorage.setItem("employeesData", JSON.stringify(state.employeesData));
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
    setEntriesToShow: (state, { payload }) => {
      state.pagination.entriesToShow = payload;
    },
    setCurrentPage: (state, { payload }) => {
      state.pagination.currentPage = payload;
    },
    filterEmployees: (state) => {
      if (state.searchValue) {
        const searchValueLowerCase = state.searchValue.toLowerCase();
        state.filteredResults = state.employeesData.filter((employee) =>
          Object.values(employee).some((value) =>
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
  setEmployeesDataNoCreatedAt,
  setEmployeesData,
  addEmployee,
  setError,
  setCurrentPage,
  setEntriesToShow,
  setSearch,
  updateEmployee,
  deleteEmployee
} = employeesSlice.actions;
export default employeesSlice.reducer;
