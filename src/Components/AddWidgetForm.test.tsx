import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import AddWidgetForm from "./AddWidgetForm";

describe("AddWidgetForm", () => {
  it("renders the form correctly", async () => {
    render(<AddWidgetForm onAddWidget={jest.fn()} />);

    await userEvent.click(
      screen.getByRole("button", { name: /Add New Widget/i })
    );

    await waitFor(() => {
      expect(screen.getByLabelText(/City Name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Temperature \(°C\)/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Weather Condition/i)).toBeInTheDocument();
      expect(
        screen.getByLabelText(/Wind Speed \(km\/h\)/i)
      ).toBeInTheDocument();
      expect(screen.getByLabelText(/Wind Direction/i)).toBeInTheDocument();
    });
  });

  it("submits the form with correct values", async () => {
    const handleAddWidget = jest.fn();
    render(<AddWidgetForm onAddWidget={handleAddWidget} />);

    await userEvent.click(
      screen.getByRole("button", { name: /Add New Widget/i })
    );

    await waitFor(() => {
      expect(screen.getByLabelText(/City Name/i)).toBeInTheDocument();
    });

    const cityInput = screen.getByLabelText(/City Name/i);
    await userEvent.type(cityInput, "London");

    const temperatureInput = screen.getByLabelText(/Temperature \(°C\)/i);
    await userEvent.type(temperatureInput, "20");

    await userEvent.click(screen.getByLabelText(/Weather Condition/i));
    await userEvent.click(screen.getByText(/sunny/i));

    const windSpeedInput = screen.getByLabelText(/Wind Speed/i);
    await userEvent.type(windSpeedInput, "15");

    const windDirectionInput = screen.getByLabelText(/Wind Direction/i);
    await userEvent.type(windDirectionInput, "NW");

    await userEvent.click(screen.getByRole("button", { name: /Add Widget/i }));

    await waitFor(() => {
      expect(handleAddWidget).toHaveBeenCalledWith({
        city: "London",
        temperature: 20,
        condition: "sunny",
        windSpeed: 15,
        windDirection: "NW",
        date: expect.any(String),
      });
    });
  });
});
