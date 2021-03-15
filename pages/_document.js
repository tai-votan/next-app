import 'antd/dist/antd.less';
import { ServerStyleSheet } from 'styled-components';
import Document, { Head, Html, Main, NextScript } from 'next/document';

function setInitialColorMode() {
  function getInitialColorMode() {
    const preference = window.localStorage.getItem('theme');
    let hasPreference = typeof preference === 'string';

    if (hasPreference) {
      return preference;
    }
    const mediaQuery = '(prefers-color-scheme: dark)';
    const mql = window.matchMedia(mediaQuery);

    hasPreference = typeof mql.matches === 'boolean';
    if (hasPreference) {
      return mql.matches ? 'dark' : 'light';
    }
    return 'light';
  }

  const colorMode = getInitialColorMode();

  if (colorMode === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
}

const blockingSetInitialColorMode = `(function() {
  ${setInitialColorMode.toString()}
  setInitialColorMode();
})()
`;

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    // return await Document.getInitialProps(ctx);
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />)
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    const { locale } = this.props;
    return (
      <Html lang={locale} amp>
        <Head />
        <body>
          <script dangerouslySetInnerHTML={{ __html: blockingSetInitialColorMode }} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
