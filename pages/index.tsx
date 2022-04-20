import { useTheme } from "@emotion/react";
import { alpha, Container, Theme } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import TimetableSearch from "../src/components/TimetableSearch";
import { TimetableSearchProvider } from "../src/components/TimetableSearchProvider";

const Home: NextPage = () => {
  const theme = useTheme() as Theme;
  return (
    <>
      <Head>
        <title>Grape Transport Planner</title>
        <meta
          name="description"
          content="Find public transport routes across Switzerland with ease"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        style={{
          width: "100vw",
          minHeight: "100vh",
          position: "absolute",
          backgroundColor: alpha(theme.palette.primary.light, 0.4),
          paddingBottom: 6,
        }}
      >
        <Container>
          <TimetableSearchProvider>
            <TimetableSearch />
          </TimetableSearchProvider>
        </Container>
      </main>
    </>
  );
};

export default Home;
