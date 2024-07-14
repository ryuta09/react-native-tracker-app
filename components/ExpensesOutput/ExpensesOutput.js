import {Text, View, StyleSheet } from 'react-native';
import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';
import { GlobalStyles } from '../../constants/styles';



function ExpensesOutput({expenses, exprnsesPeriod, fallback}) {
  let content = <Text style={styles.infoText}>{fallback}</Text>

  if(expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />
  } else {

  }
  return(
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={exprnsesPeriod}/>
      {content}
    </View>
  )
}

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
    margin: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32
  }
})