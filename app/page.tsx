"use client";

import React, { useState } from "react";
import { Container, Grid, Box, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useFetch from "./hooks/useFetch";
import Header from "./components/Header";
import PrimaryButton from "./components/PrimaryButton";

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

  const [showJoke, setShowJoke] = useState<boolean>(false);
  const toggleShow = () => setShowJoke((prev) => !prev);

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
            {/* need a border here */}
            <Grid item xs={12} mt={6}>
              {error && (
                <Box textAlign="center">
                  <Typography color="error" fontWeight="bold">
                    THERE WAS AN ERROR LOADING YOUR JOKE.
                  </Typography>
                </Box>
              )}
              {/* if loading or data request in progress show loading message */}
              {!joke || isLoading ? (
                <Box textAlign="center">
                  <Typography fontWeight="bold">
                    LOADING YOUR JOKE...
                  </Typography>
                </Box>
              ) : (
                <>
                  <Box
                    p={2}
                    display="flex"
                    flexDirection="column"
                    className="quote-wrap-start"
                  >
                    {joke && <Typography fontSize={26}>{joke.joke}</Typography>}
                  </Box>
                  <Box
                    p={2}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                    mt={2}
                  >
                    <PrimaryButton
                      variant="contained"
                      text={!showJoke ? "Show Punchline" : "Hide Punchline"}
                      onClick={toggleShow}
                      color="secondary"
                    />
                  </Box>
                </>
              )}
              <Box
                p={2}
                display="flex"
                flexDirection="column"
                alignItems="flex-end"
                justifyContent="flex-end"
              >
                <Typography fontSize={26}>{joke?.punchLine}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
};

export default Home;
