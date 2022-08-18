import { render as rtlRender, RenderOptions } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppProviders } from "src/contexts";

const render = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => rtlRender(ui, { wrapper: AppProviders, ...options });

export * from "@testing-library/react";
export { render, userEvent };
