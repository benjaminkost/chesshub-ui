import React from "react";
import { render, screen } from "@testing-library/react";
import {Registration} from "../../src/pages/Registration.jsx";
import { expect, describe, it, vi} from "vitest";
import "@testing-library/jest-dom/vitest";
import {MemoryRouter} from "react-router-dom";
import userEvent from '@testing-library/user-event';

vi.mock('../../client/apiChessHubCoreClient.js', () => (
    {_post: vi.fn(),
    }));

import {_post} from "../../client/apiChessHubCoreClient.js";

describe("Registration", () => {

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

        _post.mockResolvedValue(true);

        const inputElementPassword = screen.getByLabelText("Password:")
        const inputElementConfirmedPassword = screen.getByLabelText(/Confirm Password/i)

        const testPasswordInput = "a"
        const testConfirmedPasswordInput = "a"

        await user.type(inputElementPassword, testPasswordInput)
        await user.type(inputElementConfirmedPassword, testConfirmedPasswordInput)

        await user.click(document.getElementById("buttonRegistration"))

        expect(screen.getByText("User registered!")).toBeInTheDocument()
    })
})