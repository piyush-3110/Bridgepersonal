"use client";
import { store } from "@/lib/store";
import React, { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import Web3ModalProvider from "@/context";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <Provider store={store}>
      <Web3ModalProvider>{children}</Web3ModalProvider>
    </Provider>
  );
}
