import { render, screen } from "@testing-library/react";
import { Button } from "../index";
import { ThemeButton } from "./Button";

describe("Button", () => {
    test("renders correctly", () => {
        render(<Button>TEST</Button>);

        expect(screen.getByText("TEST")).toBeInTheDocument();
    });

    test("renders with clear theme", () => {
        render(<Button theme={ThemeButton.CLEAR}>TEST</Button>);

        expect(screen.getByText("TEST")).toHaveClass("clear");
        screen.debug();
    });
})