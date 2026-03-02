import React from "react";
import { render, screen} from "@testing-library/react";
import {Registration} from "../../src/pages/Registration.tsx";
import {expect, describe, it, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import {MemoryRouter} from "react-router-dom";
import { userEvent } from '@testing-library/user-event';
import {_post} from "../../bff/clients/apiChessHubCoreClient.js";

describe("Registration", () => {
    vi.mock('../../bff/clients/apiChessHubCoreClient.ts', () => ({
        _post: vi.fn(),
    }));

    beforeEach(() => {
        vi.mocked(_post).mockReset();
    });

    it("renders without crashing", () => {
        render(
            <MemoryRouter>
                <Registration/>
            </MemoryRouter>
        );

        screen.debug();
        expect(screen.getByText("Registration")).toBeInTheDocument();
    })

    it("Put in different passwords and press register button returns error message", async ()  => {
        const user = userEvent.setup();

        render(
            <MemoryRouter>
                <Registration/>
            </MemoryRouter>
        );

        const inputElementPassword = screen.getByLabelText("Password:")
        const inputElementConfirmedPassword = screen.getByLabelText(/Confirm Password/i)

        const testPasswordInput = "a"
        const testConfirmedPasswordInput = "ab"

        await user.type(inputElementPassword, testPasswordInput)
        await user.type(inputElementConfirmedPassword, testConfirmedPasswordInput)

        await user.click(document.getElementById("buttonRegistration"))

        expect(screen.getByText("Passwords do not match!")).toBeInTheDocument()
    })

    it("Put in same passwords and press button returns success message", async ()  => {
        const user = userEvent.setup();

        render(
            <MemoryRouter>
                <Registration/>
            </MemoryRouter>
        );

        vi.mocked(_post).mockReturnValue(true);

        const inputElementPassword = screen.getByLabelText("Password:")
        const inputElementConfirmedPassword = screen.getByLabelText("Confirm Password:")

        const testPasswordInput = "a"
        const testConfirmedPasswordInput = "a"

        await user.type(inputElementPassword, testPasswordInput)
        await user.type(inputElementConfirmedPassword, testConfirmedPasswordInput)

        await user.click(document.getElementById("buttonRegistration"))
        const successMessage = await screen.findByText("User registered!")

        expect(successMessage).toBeInTheDocument()
    })
})