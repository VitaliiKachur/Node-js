import { render, screen } from "@testing-library/react";
import { ProfileForm } from "./profile-form";

jest.mock("@/app/(main)/profile/actions", () => ({
  updateProfile: jest.fn(),
}));

describe("ProfileForm", () => {
  it("renders current profile data", () => {
    render(<ProfileForm name="Vitalii" age={21} />);

    expect(screen.getByLabelText("Name")).toHaveValue("Vitalii");
    expect(screen.getByLabelText("Age")).toHaveValue(21);
    expect(
      screen.getByRole("button", { name: "Save profile" }),
    ).toBeInTheDocument();
  });

  it("renders empty optional fields", () => {
    render(<ProfileForm name={null} age={null} />);

    expect(screen.getByLabelText("Name")).toHaveValue("");
    expect(screen.getByLabelText("Age")).toHaveValue(null);
  });
});
