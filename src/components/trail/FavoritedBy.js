import { Avatar, Tooltip, Text, Group, Box } from "@mantine/core";

const FavoritedBy = ({ favorites, maxVisible = 3 }) => {
    if (!favorites || favorites.length === 0) {
        return null;
    }

    const hiddenCount = favorites.length - maxVisible;
    const visibleFavorites = favorites.slice(0, maxVisible);

    return (
        <Box mt="lg">
            <Group gap="xs" align="center">
                <Text size="sm" c="dimmed">
                    Favoritado por:
                </Text>
                <Avatar.Group spacing="sm">
                    {visibleFavorites.map((user) => (
                        <Tooltip key={user.userId} label={user.username} withArrow>
                            <Avatar src={user.profilePicUrl} radius="xl">
                                {user.username.charAt(0).toUpperCase()}
                            </Avatar>
                        </Tooltip>
                    ))}

                    {hiddenCount > 0 && <Avatar radius="xl">+{hiddenCount}</Avatar>}
                </Avatar.Group>
            </Group>
        </Box>
    );
};

export default FavoritedBy;
