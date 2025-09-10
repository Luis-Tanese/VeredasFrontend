import React from "react";
import { Container, Title, Text, Button, Center, Stack } from "@mantine/core";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <Container>
                    <Center style={{ height: "100vh" }}>
                        <Stack align="center">
                            <Title order={1}>Algo deu errado.</Title>
                            <Text c="dimmed">Ocorreu um erro inesperado na aplicação.</Text>
                            <Button onClick={() => window.location.replace("/")}>Voltar para a Página Inicial</Button>
                        </Stack>
                    </Center>
                </Container>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
