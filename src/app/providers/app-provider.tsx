import { type ReactNode } from "react";
import { Provider } from "react-redux";
import { NuqsAdapter } from "nuqs/adapters/react";
import { Toaster } from "sonner";
import { store } from "@/app/store";

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <Provider store={store}>
      <NuqsAdapter>
        {children}
        <Toaster position="bottom-right" richColors />
      </NuqsAdapter>
    </Provider>
  );
}
