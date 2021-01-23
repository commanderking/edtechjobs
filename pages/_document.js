import Document, { Html, Head, Main, NextScript } from "next/document";

import { GA_TRACKING_ID } from "utils/gtag";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script
            async
            defer
            data-domain="bostonedtechjobs.netlify.app"
            src="https://plausible.io/js/plausible.js"
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
