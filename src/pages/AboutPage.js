import { Container, Title, Text, Paper, Stack, SimpleGrid } from "@mantine/core";
import MemberCard from "../components/common/MemberCard";
import MapComponent from "../components/common/MapComponent";

import Tanese from "../assets/tanese.png";
import Marco from "../assets/marco.jpg";
import Enzo from "../assets/enzo.jpg";
import Mateus from "../assets/mateus.jpg";
import Jefferson from "../assets/jefferson.jpg";
import Oliveira from "../assets/oliveira.jpg";
import Matheus from "../assets/matheus.jpg";
import Fabricio from "../assets/fabricio.png";
import Trevisan from "../assets/trevisan.png";
import Maria from "../assets/maria.webp";

const AboutPage = () => {
    const teamMembers = [
        {
            id: 1,
            name: "Luis Tanese",
            role: "Desenvolvedor Back-End",
            photo: Tanese,
            badgeColor: "blue",
        },
        {
            id: 2,
            name: "Marco Paiva",
            role: "Designer UX/UI",
            photo: Marco,
            badgeColor: "green",
        },
        {
            id: 3,
            name: "Fabricio Kolling",
            role: "Desenvolvedor Front-End",
            photo: Fabricio,
            badgeColor: "red",
        },
        {
            id: 4,
            name: "Mateus Foltran",
            role: "Desenvolvedor Back-End",
            photo: Mateus,
            badgeColor: "blue",
        },
        {
            id: 5,
            name: "Enzo Lourenço",
            role: "Designer UX/UI",
            photo: Enzo,
            badgeColor: "green",
        },
        {
            id: 6,
            name: "Gabriel Trevisan",
            role: "Desenvolvedor Front-End",
            photo: Trevisan,
            badgeColor: "red",
        },
        {
            id: 7,
            name: "Jefferson Luiz",
            role: "Designer UX/UI",
            photo: Jefferson,
            badgeColor: "green",
        },
        {
            id: 8,
            name: "Gabriel Oliveira",
            role: "Desenvolvedor Front-End",
            photo: Oliveira,
            badgeColor: "red",
        },
        {
            id: 9,
            name: "Maria Clara",
            role: "Designer UX/UI",
            photo: Maria,
            badgeColor: "green",
        },
        {
            id: 10,
            name: "Matheus de Souza",
            role: "Desenvolvedor Front-End",
            photo: Matheus,
            badgeColor: "red",
        },
    ];

    return (
        <>
            <Container size="lg" my="xl">
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
                        <Title order={3} mb="lg">
                            Nossa Equipe
                        </Title>
                        <Text mb="xl">
                            Somos um grupo de entusiastas da tecnologia e amantes da natureza, dedicados a construir uma
                            ferramenta que seja ao mesmo tempo poderosa e fácil de usar. Acreditamos que a melhor forma
                            de proteger nossas paisagens naturais é incentivando as pessoas a conhecê-las e amá-las.
                        </Text>

                        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
                            {teamMembers.map((member) => (
                                <MemberCard
                                    key={member.id}
                                    name={member.name}
                                    role={member.role}
                                    photo={member.photo}
                                    badgeColor={member.badgeColor}
                                />
                            ))}
                        </SimpleGrid>
                    </Paper>

                    <MapComponent />
                </Stack>
            </Container>
        </>
    );
};

export default AboutPage;
