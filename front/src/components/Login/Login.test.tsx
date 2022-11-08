import { Login } from "./Login";
import { screen, render } from "@testing-library/react";

describe("<Login /> component", () => {
  it("Login should render with empty form", async () => {
    render(<Login />);
    const loginForm = screen.getByRole("login-form");
    expect(loginForm).toHaveFormValues({ email: "", password: "" });
  });

  it("Should handle change in form", async () => {
    render(<Login />);
    const emailInput = screen.getByTestId("emailInput") as HTMLInputElement;
    emailInput.value = "test";
    expect(emailInput).toHaveValue("test");
  });
});
