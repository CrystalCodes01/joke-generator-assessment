"use client";

import React, { useEffect } from "react";
import { Container, Grid } from "@mui/material";

const Home: React.FC = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://mwks-joke-service.azurewebsites.net/api/joke/random"
        );
        if (!res.ok) {
          throw new Error(`error: ${res.status}`);
        }
        const data = await res.json();
        console.log(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <main>
      <Container maxWidth="lg">
        <Grid container>
          <h1>Home</h1>
        </Grid>
      </Container>
    </main>
  );
}

export default Home;

