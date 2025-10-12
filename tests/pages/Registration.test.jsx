import React from "react";
import { render, screen } from "@testing-library/react";
import {Registration} from "../../src/pages/Registration.jsx";
import { expect, describe, it, vi} from "vitest";
import "@testing-library/jest-dom/vitest";
import {MemoryRouter} from "react-router-dom";

describe("Registration", () => {
    vi.mock('../../client/apiChessHubCoreClient.js', () => ({
        // We replace the exported _post function with a Vitest mock function
        _post: vi.fn(),
    }));

    it("renders without crashing", () => {
        render(
            <MemoryRouter>
             <Registration/>
            </MemoryRouter>
        );

        screen.debug();
        expect(screen.getByText("Registration")).toBeInTheDocument();
    })
})