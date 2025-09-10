import { Container, Group, Anchor, ActionIcon, Text, Box, Center, useMantineTheme } from "@mantine/core";
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import InteractiveElement from "./InteractiveElement";

const Footer = () => {
    const theme = useMantineTheme();
    const links = [
        { link: "/sobre", label: "Sobre Nós" },
        { link: "#", label: "Contato" },
        { link: "#", label: "Termos" },
    ];

    const items = links.map((link) => (
        <Anchor c="dimmed" key={link.label} component={Link} to={link.link} size="sm">
            {link.label}
        </Anchor>
    ));

    return (
        <Box
            component="footer"
            mt="xl"
            pt="md"
            pb="md"
            style={{
                borderTop: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]}`,
            }}
        >
            <Container size="xl">
                <Group justify="space-between" visibleFrom="sm">
                    <Text c="dimmed" size="sm">
                        © {new Date().getFullYear()} Veredas. Todos os direitos reservados.
                    </Text>
                    <Group>
                        {items}
                        <Group gap="xs" justify="flex-end">
                            <InteractiveElement smol>
                                <ActionIcon size="lg" color="gray" variant="subtle" aria-label="Twitter">
                                    <IconBrandTwitter size={18} stroke={1.5} />
                                </ActionIcon>
                            </InteractiveElement>
                            <InteractiveElement smol>
                                <ActionIcon size="lg" color="gray" variant="subtle" aria-label="YouTube">
                                    <IconBrandYoutube size={18} stroke={1.5} />
                                </ActionIcon>
                            </InteractiveElement>
                            <InteractiveElement smol>
                                <ActionIcon size="lg" color="gray" variant="subtle" aria-label="Instagram">
                                    <IconBrandInstagram size={18} stroke={1.5} />
                                </ActionIcon>
                            </InteractiveElement>
                        </Group>
                    </Group>
                </Group>
                <Center hiddenFrom="sm">
                    <Text c="dimmed" size="sm">
                        © {new Date().getFullYear()} Veredas. Todos os direitos reservados.
                    </Text>
                </Center>
            </Container>
        </Box>
    );
};

export default Footer;
