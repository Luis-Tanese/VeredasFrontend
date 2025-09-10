import { Paper, Avatar, Title, Text, Button, Group, Stack } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";

const ProfileHeader = ({ user, reviewCount, onEditClick }) => {
    if (!user) return null;

    return (
        <Paper withBorder shadow="md" p="xl" radius="md">
            <Group>
                <Avatar src={user.profilePicUrl} size={120} radius={120}>
                    {user.username.charAt(0).toUpperCase()}
                </Avatar>
                <Stack gap="xs" style={{ flex: 1 }}>
                    <Title order={2}>{user.username}</Title>
                    <Text c="dimmed">{user.bio || "Nenhuma biografia adicionada."}</Text>
                    <Group mt="md">
                        <Text>
                            <strong>{reviewCount}</strong> Avaliações
                        </Text>
                        <Text>
                            <strong>{user.favorites?.length || 0}</strong> Favoritos
                        </Text>
                    </Group>
                </Stack>
                <Button leftSection={<IconEdit size={14} />} variant="default" onClick={onEditClick}>
                    Editar Perfil
                </Button>
            </Group>
        </Paper>
    );
};

export default ProfileHeader;
