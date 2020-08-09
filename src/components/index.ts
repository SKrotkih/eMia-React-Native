import variable from "../theme/variables/platform";

export default (variables = variable) => {
  const theme = {
    variables,
    "NativeBase.Tabs": {
      flex: 1
    },
    "NativeBase.PickerNB": {
      "NativeBase.Button": {
        "NativeBase.Text": {}
      }
    },
  };
  return theme;
};
