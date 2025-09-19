import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorBoundary from "./components/common/ErrorBoundary";

import "@mantine/carousel/styles.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/spotlight/styles.css";
import "./index.css";

import App from "./App";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <MantineProvider
                    withGlobalStyles
                    withNormalizeCSS
                    theme={{
                        colors: {
                            brand: [
                                "#e6f2f2",
                                "#cce6e6",
                                "#99cdce",
                                "#66b4b5",
                                "#339ca2",
                                "#1f8d91",
                                "#0B8185",
                                "#086f73",
                                "#066063",
                                "#035052",
                            ],
                            earth: [
                                "#F8F7F4",
                                "#EAE8E1",
                                "#D2CEC3",
                                "#8B857B",
                                "#5C5851",
                                "#3B3934",
                                "#2C2A26",
                                "#1F1E1B",
                                "#141311",
                                "#0A0908",
                            ],
                        },
                        primaryColor: "brand",
                        colorScheme: "light",
                        defaultGradient: { from: "brand", to: "teal", deg: 45 },
                        black: "#3B3934",
                        white: "#F8F7F4",
                        headings: {
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: "bold",
                        },
                    }}
                >
                    <Notifications />
                    <ModalsProvider>
                        <ErrorBoundary>
                            <App />
                        </ErrorBoundary>
                    </ModalsProvider>
                </MantineProvider>
            </BrowserRouter>
        </QueryClientProvider>
    </React.StrictMode>
);
