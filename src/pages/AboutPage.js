import { Container, Title, Text, Paper, Stack } from "@mantine/core";

const AboutPage = () => {
    return (
        <>
            <Container size="md" my="xl">
                <Stack gap="xl">
                    <Title order={1} ta="center">
                        Sobre Veredas
                    </Title>
                    <Text c="dimmed" ta="center">
                        Conectando aventureiros às trilhas mais incríveis do Brasil.
                    </Text>

                    <Paper withBorder p="xl" radius="md">
                        <Title order={3} mb="md">
                            Nossa Missão
                        </Title>
                        <Text>
                            Nossa missão é ser a principal plataforma para descoberta e compartilhamento de trilhas,
                            promovendo a exploração consciente e a preservação da natureza. Queremos inspirar pessoas a
                            saírem de casa, se conectarem com o meio ambiente e criarem memórias inesquecíveis ao ar
                            livre.
                        </Text>
                    </Paper>

                    <Paper withBorder p="xl" radius="md">
                        <Title order={3} mb="md">
                            Nossa Equipe
                        </Title>
                        <Text>
                            Somos um grupo de entusiastas da tecnologia e amantes da natureza, dedicados a construir uma
                            ferramenta que seja ao mesmo tempo poderosa e fácil de usar. Acreditamos que a melhor forma
                            de proteger nossas paisagens naturais é incentivando as pessoas a conhecê-las e amá-las.
                        </Text>
                    </Paper>
                </Stack>
            </Container>
        </>
    );
};

export default AboutPage;
