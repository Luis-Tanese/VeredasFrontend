import { Container, Title, Text, Button, Center, Stack } from "@mantine/core";
import { IconError404 } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <>
            <Container>
                <Center style={{ height: "70vh" }}>
                    <Stack align="center">
                        <IconError404 size={120} stroke={1.5} />
                        <Title order={1} ta="center">
                            404 - Página Não Encontrada
                        </Title>
                        <Text c="dimmed" size="lg" ta="center" maw={500}>
                            A página que você está tentando acessar não existe. Você pode ter digitado o endereço
                            incorretamente ou a página foi movida.
                        </Text>
                        <Button component={Link} to="/" variant="outline" size="md" mt="xl">
                            Voltar para a página inicial
                        </Button>
                    </Stack>
                </Center>
            </Container>
        </>
    );
};

export default NotFoundPage;
