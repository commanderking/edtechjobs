import { ThemeProvider, theme, CSSReset, Box } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Box maxWidth="824px" margin="auto" padding="20px" mt={10}>
        <Component {...pageProps} lastUpdate={new Date("4/9/2021")} />
      </Box>
    </ThemeProvider>
  );
}

export default MyApp;
