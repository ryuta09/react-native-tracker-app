import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MangeExpenses from "./screen/ManageExpenses";
import RecentExpenses from "./screen/RecentExpenses";
import AllExpenses from "./screen/AllExpenses";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExspenseOverview() {
  return(
    <BottomTabs.Navigator>
      <BottomTabs.Screen name="RecentExpense" component={RecentExpenses}/>
      <BottomTabs.Screen name="AllExpenses" component={AllExpenses} />
    </BottomTabs.Navigator>
  )
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="ExpensesOverview" component={ExspenseOverview} />
          <Stack.Screen name="ManegeExpense" component={MangeExpenses}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
