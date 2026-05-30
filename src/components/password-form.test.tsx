import { render, screen } from "@testing-library/react";
import { PasswordForm } from "./password-form";

jest.mock("@/app/(main)/profile/actions", () => ({
  changePassword: jest.fn(),
}));

describe("PasswordForm", () => {
  it("requires current password when the user already has one", () => {
    render(<PasswordForm hasPassword />);

    expect(screen.getByLabelText("Current password")).toBeRequired();
    expect(screen.getByLabelText("New password")).toBeRequired();
    expect(
      screen.getByRole("button", { name: "Update password" }),
    ).toBeInTheDocument();
  });

  it("hides current password when setting the first password", () => {
    render(<PasswordForm hasPassword={false} />);

    expect(screen.queryByLabelText("Current password")).not.toBeInTheDocument();
    expect(screen.getByLabelText("New password")).toHaveAttribute(
      "minLength",
      "6",
    );
  });
});
