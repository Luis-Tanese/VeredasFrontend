import { AppShell } from "@mantine/core";
import Header from "./Header";
import Footer from "./Footer";
import SpotlightManager from "./SpotlightManager";

const Layout = ({ children }) => {
    return (
        <AppShell
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
            }}
            padding="md"
            header={{ height: 60 }}
        >
            <AppShell.Header as="div" withBorder={false}>
                <Header />
            </AppShell.Header>

            <AppShell.Main style={{ flex: 1 }}>
                {children}
                <SpotlightManager />
            </AppShell.Main>

            <Footer />
        </AppShell>
    );
};

export default Layout;
