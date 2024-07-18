import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
function RecentExpenses() {
  const [isFetching, setisFetching] = useState(true);
  const expensesCtx = useContext(ExpensesContext);
  const [error, setError] = useState();

  useEffect(() => {
    async function getExpense() {
      setisFetching(true);
      try {
        const expenses = await fetchExpense();
        expensesCtx.setExpenses(expenses);
      } catch(error) {
        setError('取得できませんでした！')
      }
      
      setisFetching(false);
    }
    getExpense();
  }, []);

  function errorHandler() {
    setError(null)
  }

  if(error && !isFetching ) {
    return <ErrorOverlay message={error} onConfirm={errorHandler}/>
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date > date7DaysAgo && expense.date <= today;
  });
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      exprnsesPeriod="Last 7 Days"
      fallback="No expenses in the last 7 days"
    />
  );
}

export default RecentExpenses;
