"use client";

import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, Grid, Box, Typography } from "@mui/material";
import Header from "./components/Header";
import useFetch from "./hooks/useFetch";
import PrimaryButton from "./components/PrimaryButton";
import ErrorBox from "./components/ErrorBox";
import Loader from "./components/Loader";

// Define the theme
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
  interface Joke {
    id: number;
    joke: string;
    punchLine: string;
  }

  const [showJoke, setShowJoke] = useState<boolean>(false);
  const toggleShow = () => {
    setShowJoke((prev) => !prev);
    // Hide punchline when toggling showJoke
    if (showJoke) setShowPunchline(false);
  };

  const [showPunchline, setShowPunchline] = useState<boolean>(false);

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
              onClick={() => {
                refetch();
                setShowPunchline(false);
              }}
              className="header-wrapper"
              linkUrl="https://mwks-joke-service.azurewebsites.net/swagger/index.html"
              linkText="View API Docs"
            />
            {/* error handling */}
            <Grid item xs={12} mt={6}>
              {error && (
                <ErrorBox text="THERE WAS AN ERROR LOADING YOUR JOKE." />
              )}
              {/* if loading or data request in progress show loading message */}
              {!joke || isLoading ? (
                <Loader text="LOADING YOUR JOKE..." />
              ) : (
                <>
                  <Box
                    py={2}
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
                      text={
                        !showPunchline ? "Show Punchline" : "Hide Punchline"
                      }
                      onClick={() => {
                        toggleShow();
                        setShowPunchline((prev) => !prev);
                      }}
                      color="secondary"
                      padding="1rem 2rem"
                      borderRadius="4rem"
                    />
                  </Box>
                </>
              )}

              {showPunchline && (
                <Box
                  py={2}
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-end"
                  justifyContent="flex-end"
                  className="quote-wrap-end"
                >
                  <Typography fontSize={26}>{joke?.punchLine}</Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
};

export default Home;
