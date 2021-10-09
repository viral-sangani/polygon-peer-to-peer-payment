import Head from "next/head";
import "tailwindcss/tailwind.css";
import { DataProvider } from "../contexts/DataContext";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <DataProvider>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inconsolata&display=swap"
            rel="stylesheet"
          />
        </Head>
        <Component {...pageProps} />
      </DataProvider>
    </>
  );
}

export default MyApp;
