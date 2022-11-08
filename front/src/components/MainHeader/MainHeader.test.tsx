import { MainHeader } from "./MainHeader";
import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("Main Header components", () => {
  test("<MainHeader />, should render", async () => {
    render(
      <MemoryRouter>
        <MainHeader firstName={""} userImage={""} logout={() => {}} />
      </MemoryRouter>
    );
    const header = screen.getByRole("header");
    expect(header).toBeInTheDocument();
  });
});
