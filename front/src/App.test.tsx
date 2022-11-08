import { App } from "./App";
import {render, screen} from "@testing-library/react"

describe("<App />", () => {
  it("should render on login page", () => {
    render(<App />)
    const loginForm = screen.getByRole("login-form")
    expect(loginForm).toBeInTheDocument()
  })
})