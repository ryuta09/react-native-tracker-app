import { Text, View, StyleSheet, TextInput } from "react-native";
import { useLayoutEffect, useState } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import { useContext } from "react";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updatedExpenses } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
// 編集や追加ができる画面
function MangeExpenses({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
  const expenseCtx = useContext(ExpensesContext);
  const editedExpenseId = route.params?.expenseId;

  // 真偽値に変換
  const isEditing = !!editedExpenseId;

  const selectedExpense = expenseCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    setIsSubmitting(true);
    try {
      await deleteExpense(editedExpenseId);
      expenseCtx.deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setError("費用を削除できませんでした！");
      setIsSubmitting(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseDate) {
    try {
      if (isEditing) {
        expenseCtx.updateExpense(editedExpenseId, expenseDate);
        setIsSubmitting(true);
        await updatedExpenses(editedExpenseId, expenseDate);
      } else {
        const id = await storeExpense(expenseDate);
        expenseCtx.addExpense({ ...expenseDate, id: id });
      }
      navigation.goBack();
    } catch(error) {
      setError('保存できませんした！')
      setIsSubmitting(false)
    }
    
  }

  function errorHandler() {
    setError(null)
  }
  if(error && !isSubmitting) {
    return <ErrorOverlay  message={error} onConfirm={errorHandler} />
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default MangeExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
