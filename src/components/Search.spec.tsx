import Search from "./Search";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("SearchBar", () => {
  it("should notify changes in search input when user stop typing (fast typing)", async () => {
    const handleChangeMock = jest.fn();
    render(<Search onChange={handleChangeMock} />);
    await userEvent.type(screen.getByPlaceholderText("Search title…"), "2001", {
      delay: 30,
    });
    await waitFor(() => expect(handleChangeMock).toHaveBeenCalledTimes(1));
    expect(handleChangeMock).toHaveBeenCalledWith("2001");
  });

  it("should notify changes in search input when user stop typing (slow typing)", async () => {
    const handleChangeMock = jest.fn();
    render(<Search onChange={handleChangeMock} />);
    await userEvent.type(screen.getByPlaceholderText("Search title…"), "JO", {
      delay: 500,
    });
    await waitFor(() => expect(handleChangeMock).toHaveBeenCalledTimes(2));
    expect(handleChangeMock.mock.calls[0][0]).toBe("J");
    expect(handleChangeMock.mock.calls[1][0]).toBe("JO");
  });
});
