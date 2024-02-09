"use client";

import { Container, Grid, Box, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useFetch from "./hooks/useFetch";
import Header from "./components/Header";

// Get the green & Blue from mockup to use for styling
const theme = createTheme({
  palette: {
    primary: {
      main: "#61C363",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#0080C3",
      contrastText: "#FFFFFF",
    },
  },
});

const Home: React.FC = () => {
  // Define the Joke interface
  interface Joke {
    id: number;
    joke: string;
    punchLine: string;
  }

  // useFetch hook with Joke type
  const {
    data: joke,
    isLoading,
    error,
    refetch,
  } = useFetch<Joke>(
    "https://mwks-joke-service.azurewebsites.net/api/joke/random"
  );

  return (
    <ThemeProvider theme={theme}>
      <main>
        <Container maxWidth="lg">
          <Grid container>
            <Header
              onClick={refetch}
              className="header-wrapper"
              linkUrl="https://mwks-joke-service.azurewebsites.net/swagger/index.html"
              linkText="View API Docs"
            />
            <Grid item xs={12} mt={6}>
              <h1>{joke?.joke}</h1>
              <h2>{joke?.punchLine}</h2>
              <Box textAlign="center">
                <Typography color="error" fontWeight="bold">
                  THERE WAS AN ERROR LOADING YOUR JOKE.
                </Typography>
              </Box>
              <Box textAlign="center">
                <Typography fontWeight="bold">LOADING YOUR JOKE...</Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
};

export default Home;
