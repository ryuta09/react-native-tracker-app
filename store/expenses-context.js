import { createContext, useReducer } from "react";

export const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "pari of shoes",
    amount: 300,
    date: new Date("2024-07-11"),
  },
  {
    id: "e2",
    description: "pari of trousers",
    amount: 3400,
    date: new Date("2024-07-03"),
  },
  {
    id: "e3",
    description: "Some of bananas",
    amount: 600,
    date: new Date("2024-06-01"),
  },
  {
    id: "e4",
    description: "book",
    amount: 2500,
    date: new Date("2024-07-11"),
  },
  {
    id: "e5",
    description: "Another book",
    amount: 4400,
    date: new Date("2024-07-12"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amunt, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amunt, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload)
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  // 第二引数に関してはReducerが実行する前の初期値を表す。
  const [expenseState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense({ expenseDate }) {
    dispatch({ type: "ADD", payload: expenseDate });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expenseState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense
  }

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}

export default ExpensesContextProvider;
