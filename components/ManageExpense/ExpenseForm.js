import { View, StyleSheet, TextInput, Text, Alert } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";
function ExpenseForm({ onCancel, onSubmit, submitButtonLabel, defaultValues }) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: !!defaultValues,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: !!defaultValues,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: !!defaultValues,
    },
  });

  function inputChangeHandler(inputIdentifier, enterdAmount) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enterdAmount, isValid: true },
      };
    });
  }

  function submitHandler() {
    const expenseDate = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIdValid = !isNaN(expenseDate.amount) && expenseDate.amount > 0;
    const dateIdValid = expenseDate.date.toString() !== "Invalid Date";
    const descriptinoIsValid = expenseDate.description.trim().length > 0;

    if (!amountIdValid || !dateIdValid || !descriptinoIsValid) {
      setInputs((curINputs) => {
        return {
          amount: {
            value: curINputs.amount.value,
            isValid: amountIdValid,
          },
          date: {
            value: curINputs.date.value,
            isValid: dateIdValid,
          },
          description: {
            value: curINputs.description.value,
            isValid: descriptinoIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseDate);
  }
  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label={"Amount"}
          isValid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
          style={styles.rowInput}
        />
        <Input
          label={"Date"}
          isValid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
          style={styles.rowInput}
        />
      </View>

      <Input
        label={"Description"}
        isValid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          // autoCapitalize: 'none',
          // autoCorrect: false // defaultはtrue
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputs.description.value,
        }}
      />
      {formIsInvalid && <Text style={styles.errorText}>Invalid input values - please check your enterd data!</Text>}
      <View style={styles.buttons}>
        <Button style={styles.button} mode={"flat"} onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8,

  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  }
});
