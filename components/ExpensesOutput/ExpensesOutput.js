import { View, StyleSheet } from 'react-native';
import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';
import { GlobalStyles } from '../../constants/styles';

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'pari of shoes',
    amount: 300,
    date: new Date('2024-07-11')
  },
  {
    id: 'e2',
    description: 'pari of trousers',
    amount: 3400,
    date: new Date('2024-07-03')
  },
  {
    id: 'e3',
    description: 'Some of bananas',
    amount: 600,
    date: new Date('2024-07-01')
  },
  {
    id: 'e4',
    description: 'book',
    amount: 2500,
    date: new Date('2024-07-11')
  },
  {
    id: 'e5',
    description: 'Another book',
    amount: 4400,
    date: new Date('2024-07-12')
  },
]

function ExpensesOutput({expenses, exprnsesPeriod}) {
  return(
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={exprnsesPeriod}/>
      <ExpensesList expenses={DUMMY_EXPENSES} />
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
  }
})