import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import { SignInForm } from "../../components/SignIn";

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      const onSubmit = jest.fn();
      render(<SignInForm onSubmit={onSubmit} />);

      const username = screen.getByPlaceholderText("Username");
      const password = screen.getByPlaceholderText("Password");
      fireEvent.changeText(username, "kalle");
      fireEvent.changeText(password, "password");
      fireEvent.press(screen.getByText("Sign in"));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: "kalle",
          password: "password",
        });
      });
    });
  });
});
