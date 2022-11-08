import { Signup } from "./Signup";
import { render, screen } from "@testing-library/react";

describe("<Signup /> component", () => {
  render(<Signup />);
  const signupForm = screen.getByRole("signup-form");
  it("Should render with empty form", () => {
    expect(signupForm).toHaveFormValues({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  });

  it("Should handle change in form", async () => {
    render(<Signup />);
    const firstNameInput = screen.getByTestId("firstNameInput") as HTMLInputElement;
    firstNameInput.value = "John"
    expect(firstNameInput).toHaveValue("John");
  });
});
