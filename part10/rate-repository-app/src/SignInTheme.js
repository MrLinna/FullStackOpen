import theme from "./theme";

const SignInTheme = {
  buttonText: {
    color: theme.colors.appBarText,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.body,
    textAlign: "center",
  },
  buttonContainer: {
    backgroundColor: theme.colors.signInBtn,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
    shadowColor: theme.colors.shadow,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    fontSize: 20,
  },
  flexContainer: {
    backgroundColor: theme.colors.appBarText,
  },
};

export default SignInTheme;
