import { Paper, Group, Avatar, Text, Stack, Anchor, Title } from "@mantine/core";

const AuthorCard = ({ author }) => {
    if (!author) {
        return null;
    }

    return (
        <Paper withBorder p="md" radius="md">
            <Stack>
                <Title order={5} c="dimmed">
                    Trilha Original Por
                </Title>
                <Group>
                    <Avatar src={author.profilePicture} radius="xl" />
                    <Stack gap={0}>
                        <Text>{author.name}</Text>
                        <Anchor href={author.profileLink} target="_blank" rel="noopener noreferrer" size="sm">
                            Ver perfil no Wikiloc
                        </Anchor>
                    </Stack>
                </Group>
            </Stack>
        </Paper>
    );
};

export default AuthorCard;
