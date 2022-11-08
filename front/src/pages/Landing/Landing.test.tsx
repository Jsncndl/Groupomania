import { Landing } from "./Landing";
import { screen, render, fireEvent } from "@testing-library/react";

describe("<Landing /> page", () => {
  it("Render on login component first", () => {
    render(<Landing />);
    const loginForm = screen.getByRole("login-form");
    expect(loginForm).toHaveFormValues({
      email: "",
      password: "",
    });
  });

  it("Should switch to signup form when user click on signup button", () => {
    render(<Landing />);
    const signupButton = screen.getByTestId("signup-button");
    fireEvent.click(signupButton);
    const signupForm = screen.getByRole("signup-form");
    expect(signupForm).toBeInTheDocument();
  });
});
