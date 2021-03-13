import { ThemeProvider, theme, CSSReset, Box } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Box maxWidth="824px" margin="auto" padding="20px" mt={10}>
        <Component {...pageProps} />
      </Box>
    </ThemeProvider>
  );
}

export default MyApp;
