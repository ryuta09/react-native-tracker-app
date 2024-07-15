import { Text, View, StyleSheet, TextInput } from "react-native";
import { GlobalStyles } from "../../constants/styles";
function Input({ label, style, textInputConfig, isValid }) {

  const inputStyles = [styles.input]

  if(textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline)
  }

  if(isValid) {
    inputStyles.push(styles.invalidInput)
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, isValid && styles.invalidLabel]}>{label}</Text>
      <TextInput style={inputStyles} {...textInputConfig}/>
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: GlobalStyles.colors.eror500,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50
  }
});
