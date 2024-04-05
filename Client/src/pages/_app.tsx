import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();
const clientId =
  process.env.GOOGLE_CLIENT_ID ??
  "714119740864-86bb52urngugkd0t6iorv6cq5rv5ecvm.apps.googleusercontent.com";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>UNFood</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logoUNFoodObj_0.png" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId={clientId}>
          <Component {...pageProps} />
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </>
  );
}