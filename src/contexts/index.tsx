import { ReactQueryProvider, ReactQueryProviderProps } from "./ReactQuery";

type AppProvidersProps = {
  children: React.ReactNode;
  dehydratedState?: ReactQueryProviderProps["dehydratedState"];
};

export const AppProviders = ({
  children,
  dehydratedState,
}: AppProvidersProps) => (
  <ReactQueryProvider dehydratedState={dehydratedState}>
    {children}
  </ReactQueryProvider>
);
