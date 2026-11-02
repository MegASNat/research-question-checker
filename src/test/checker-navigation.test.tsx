import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Route } from "@/routes/index";

function openChecker() {
  const Component = Route.options.component;
  if (!Component) throw new Error("Checker component missing");
  render(<Component />);
}

function answerAndCheck() {
  for (let i = 1; i <= 5; i++) {
    fireEvent.click(document.getElementById(`q${i}-yes`) as HTMLInputElement);
  }
  fireEvent.click(screen.getByRole("button", { name: "Check my question" }));
}

describe("checker navigation", () => {
  beforeEach(() => {
    window.history.replaceState({}, "", "/");
    vi.spyOn(performance, "now").mockReturnValue(1000);
  });
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("ignores Start over for 600 ms, then clears answers without disabling it", () => {
    openChecker();
    answerAndCheck();
    const reset = screen.getByRole("button", { name: "Start over" });
    expect(reset).not.toBeDisabled();
    vi.mocked(performance.now).mockReturnValue(1599);
    fireEvent.click(reset);
    expect(screen.getByRole("heading", { name: "100/100 Ready to go" })).toBeInTheDocument();
    vi.mocked(performance.now).mockReturnValue(1600);
    fireEvent.click(reset);
    expect(screen.getAllByRole("radio").every((radio) => !(radio as HTMLInputElement).checked)).toBe(true);
    expect(window.location.hash).toBe("");
  });

  it("Back preserves answers, clears errors and focuses Check; checking works again", () => {
    openChecker();
    const questionsState = window.history.state;
    fireEvent.click(screen.getByRole("button", { name: "Check my question" }));
    answerAndCheck();
    expect(window.location.hash).toBe("#results");
    act(() => {
      window.history.replaceState(questionsState, "", "/");
      window.dispatchEvent(new PopStateEvent("popstate", { state: questionsState }));
    });
    expect(screen.getAllByRole("radio").filter((radio) => (radio as HTMLInputElement).checked)).toHaveLength(5);
    expect(screen.queryByText("Not answered yet")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Check my question" })).toHaveFocus();
    fireEvent.click(screen.getByRole("button", { name: "Check my question" }));
    expect(screen.getByRole("heading", { name: "100/100 Ready to go" })).toBeInTheDocument();
  });

  it("direct #results loads empty questions", () => {
    window.history.replaceState({ researchCheckerResults: "old" }, "", "/#results");
    openChecker();
    expect(screen.getAllByRole("radio").every((radio) => !(radio as HTMLInputElement).checked)).toBe(true);
    expect(window.location.hash).toBe("");
  });

  it("Start over invalidates stale results entries on later history traversal", () => {
    openChecker();
    answerAndCheck();
    const staleState = window.history.state;
    vi.mocked(performance.now).mockReturnValue(1600);
    fireEvent.click(screen.getByRole("button", { name: "Start over" }));
    act(() => {
      window.history.replaceState(staleState, "", "/#results");
      window.dispatchEvent(new PopStateEvent("popstate", { state: staleState }));
    });
    expect(screen.getByRole("button", { name: "Check my question" })).toBeInTheDocument();
    expect(window.location.hash).toBe("");
    expect(screen.getAllByRole("radio").every((radio) => !(radio as HTMLInputElement).checked)).toBe(true);
  });
});