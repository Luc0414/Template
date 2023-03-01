import { Store } from "@reduxjs/toolkit";
import { LanguageProvider } from "./context/translation";
import { Provider } from "react-redux";
import {
  ThemeProvider as NextThemeProvider,
  useTheme as useNextTheme,
} from "next-themes";
import { UIKitProvider } from "./uikit/Providers";
import { dark, light } from "./uikit/theme";
import { WagmiConfig } from "wagmi";
import { client } from "./config/wagmi";

const StyledUIKitProvider: React.FC<React.PropsWithChildren> = ({
  children,
  ...props
}) => {
  const { resolvedTheme } = useNextTheme();

  return (
    <UIKitProvider theme={resolvedTheme === "dark" ? dark : light} {...props}>
      {children}
    </UIKitProvider>
  );
};
const Providers: React.FC<React.PropsWithChildren<{ store?: Store }>> = ({
  children,
  store,
}) => {
  return (
    <WagmiConfig client={client}>
      <Provider store={store}>
        <NextThemeProvider>
          <StyledUIKitProvider>
            <LanguageProvider>{children}</LanguageProvider>
          </StyledUIKitProvider>
        </NextThemeProvider>
      </Provider>
    </WagmiConfig>
  );
};

export default Providers;
