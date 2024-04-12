import Navbar from "@/components/navbar";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "../styles/globals.css";

import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <MantineProvider theme={{ colorScheme: "dark" }}>
      <Navbar />
      <Toaster />
      <Component {...pageProps} />
    </MantineProvider>
  );
}
