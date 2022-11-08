import { ModifyProfile } from "./ModifyProfile";
import { fireEvent, render, screen } from "@testing-library/react";

describe("<ModifyProfile /> form should render", () => {
  it("Should render a form", async () => {
    render(<ModifyProfile />);
    const firstNameInput = screen.getByTestId("firstnameinput");
    expect(firstNameInput).toHaveValue("");
  });

  it("Should render input to change password", () => {
    render(<ModifyProfile />);
    const buttonNewPassword = screen.getByTestId("buttonNewPassword");
    fireEvent.click(buttonNewPassword);
    const newPasswordInput = screen.getByTestId("newPasswordInput");
    expect(newPasswordInput).toBeInTheDocument();
  });
});
