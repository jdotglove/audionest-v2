import Head from "next/head";

import ThemeColors from "../src/ThemeColors";
import ChartProvider from "../src/providers/ChartProvider";
import FontProvider from "../src/providers/FontProvider";

import "../styles/globals.css";
import "../styles/scss/index.scss";
import SpotifyProvider from "../src/providers/SpotifyProvider";

export default function AudioNestApp({
  Component,
  pageProps,
}: {
  Component: any;
  pageProps: any;
}) {
  return (

      <ThemeColors>
        <FontProvider>
          <Head>
            <title>AudioNest</title>
            <meta
              name="description"
              content="The nest you never want to leave"
            />
          </Head>
          <Component props={pageProps} />
        </FontProvider>
      </ThemeColors>
  );
}
