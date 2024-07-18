import axios from "axios";
const BACKEN_DURL =
  "https://react-native-course-a72e8-default-rtdb.firebaseio.com";
export async function storeExpense(expenseData) {
  const response = await axios.post(`${BACKEN_DURL}/expenses.json`, expenseData);
  const id = response.data.name;
  return id;
}

export async function fetchExpense() {
  const reseponse = await axios.get(`${BACKEN_DURL}/expenses.json`);
  const expenses = [];
  for (const key in reseponse.data) {
    const expensesObj = {
      id: key,
      amount: reseponse.data[key].amount,
      date: new Date(reseponse.data[key].date),
      description: reseponse.data[key].description,
    };
    expenses.push(expensesObj);
  }
  return expenses;
}

// 更新
export function updatedExpenses(id, expenseData) {
  return axios.put(`${BACKEN_DURL}/expenses/${id}.json`, expenseData)
}
// 削除
export function deleteExpense(id) {
  return axios.delete(`${BACKEN_DURL}/expenses/${id}.json`)
}
