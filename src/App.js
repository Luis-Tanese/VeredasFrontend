import { useEffect, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import useAuthStore from "./contexts/useAuthStore";
import { LoadingOverlay } from "@mantine/core";
import { AnimatePresence } from "framer-motion";

import Layout from "./components/common/Layout";
import ProtectedRoute from "./components/common/ProtectedRoute";
import PageTransition from "./components/common/PageTransition";

// Pages
const HomePage = lazy(() => import("./pages/HomePage"));
const TrailDetailPage = lazy(() => import("./pages/TrailDetailPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const App = () => {
    const { isLoading, checkAuth } = useAuthStore();
    const location = useLocation();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    if (isLoading) {
        return <LoadingOverlay visible={true} overlayProps={{ radius: "sm", blur: 2 }} />;
    }

    return (
        <Layout>
            <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
                <Routes location={location} key={location.pathname}>
                    <Route
                        path="/"
                        element={
                            <PageTransition>
                                <HomePage />
                            </PageTransition>
                        }
                    />
                    <Route
                        path="/trilha/:id"
                        element={
                            <PageTransition>
                                <TrailDetailPage />
                            </PageTransition>
                        }
                    />
                    <Route
                        path="/sobre"
                        element={
                            <PageTransition>
                                <AboutPage />
                            </PageTransition>
                        }
                    />

                    <Route
                        path="/login"
                        element={
                            <PageTransition>
                                <LoginPage />
                            </PageTransition>
                        }
                    />
                    <Route
                        path="/cadastro"
                        element={
                            <PageTransition>
                                <RegisterPage />
                            </PageTransition>
                        }
                    />

                    <Route
                        path="/perfil"
                        element={
                            <PageTransition>
                                <ProtectedRoute>
                                    <ProfilePage />
                                </ProtectedRoute>
                            </PageTransition>
                        }
                    />

                    <Route
                        path="*"
                        element={
                            <PageTransition>
                                <NotFoundPage />
                            </PageTransition>
                        }
                    />
                </Routes>
            </AnimatePresence>
        </Layout>
    );
};

export default App;
