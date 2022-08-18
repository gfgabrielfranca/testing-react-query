import type { AppProps } from "next/app";
import { AppProviders } from "src/contexts";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProviders {...pageProps}>
      <Component {...pageProps} />
    </AppProviders>
  );
}

export default MyApp;
