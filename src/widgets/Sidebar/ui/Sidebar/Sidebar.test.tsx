import { fireEvent, screen } from "@testing-library/react";
import { Sidebar } from "../../index";
import { renderWithTranslation } from "shared/lib/tests/renderWithTranslation/renderWithTranslation";

describe("Sidebar", () => {
    test("renders correctly", () => {
        renderWithTranslation(<Sidebar />);

        expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    });

    test("toggle works correctly", () => {
        renderWithTranslation(<Sidebar />);

        const toggleBtn = screen.getByTestId("sidebar-toggle");
        expect(toggleBtn).toBeInTheDocument();
        expect(screen.getByTestId("sidebar")).toHaveClass("collapsed");

        fireEvent.click(toggleBtn);

        expect(screen.getByTestId("sidebar")).not.toHaveClass("collapsed");
    });
})