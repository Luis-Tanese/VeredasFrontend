import { Link } from "react-router-dom";
import { Card, Image, Text, Group, Badge, Rating, Stack, ActionIcon, Tooltip } from "@mantine/core";
import { IconMapPin, IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleFavorite } from "../../services/userService";
import useAuthStore from "../../contexts/useAuthStore";
import classes from "./TrailCard.module.css";
import { getDifficultyColors } from "../../utils/styleUtils";

const TrailCard = ({ trail }) => {
    const { user, isAuthenticated, updateUser } = useAuthStore();
    const queryClient = useQueryClient();

    const { mutate: handleToggleFavorite } = useMutation({
        mutationFn: toggleFavorite,
        onMutate: async (trailId) => {
            await queryClient.cancelQueries({ queryKey: ["user"] });
            const previousUser = queryClient.getQueryData(["user"]);
            const isCurrentlyFavorited = user.favorites.includes(trailId);
            const newFavorites = isCurrentlyFavorited
                ? user.favorites.filter((favId) => favId !== trailId)
                : [...user.favorites, trailId];
            updateUser({ ...user, favorites: newFavorites });
            return { previousUser };
        },
        onError: (err, trailId, context) => {
            if (context.previousUser) {
                updateUser(context.previousUser);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
    });

    if (!trail || !trail.stats) {
        return null;
    }

    const { id, name, images, city, state, stats, reviewStats } = trail;

    const handleFavoriteClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        handleToggleFavorite(id);
    };

    const imageUrl = images && images.length > 0 ? images[0] : null;

    const difficultyColors = getDifficultyColors(stats.difficulty);

    const isFavorited = user?.favorites?.includes(id);

    return (
        <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            component={Link}
            to={`/trilha/${id}`}
            className={classes.card}
        >
            <Card.Section>
                <Image
                    src={imageUrl}
                    height={180}
                    alt={`Imagem de ${name}`}
                    fallbackSrc="https://placehold.co/600x400?text=Trilha"
                />
            </Card.Section>

            {isAuthenticated && (
                <Tooltip label={isFavorited ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}>
                    <ActionIcon
                        className={classes.favoriteIcon}
                        variant="default"
                        size="lg"
                        radius="xl"
                        onClick={handleFavoriteClick}
                    >
                        {isFavorited ? <IconHeartFilled size={20} style={{ color: "red" }} /> : <IconHeart size={20} />}
                    </ActionIcon>
                </Tooltip>
            )}

            {reviewStats?.averageRating > 0 && (
                <Badge
                    className={classes.rating}
                    variant="filled"
                    size="lg"
                    rightSection={<Rating value={reviewStats.averageRating} fractions={2} readOnly size="xs" />}
                >
                    {reviewStats.averageRating.toFixed(1)}
                </Badge>
            )}

            <Stack mt="md" mb="xs" gap="xs">
                <Text fw={500} truncate="end">
                    {name || "Nome da Trilha"}
                </Text>
                <Group gap="xs" c="dimmed" fz="sm">
                    <IconMapPin size={16} />
                    <Text span>{city && state ? `${city}, ${state}` : "Localização"}</Text>
                </Group>
            </Stack>

            <Group justify="space-between" mt="md">
                <Badge
                    variant="filled"
                    style={{
                        backgroundColor: difficultyColors.backgroundColor,
                        color: difficultyColors.color,
                    }}
                >
                    {stats.difficulty || "N/A"}
                </Badge>
                <Text size="sm" c="dimmed">
                    {stats.distance || "N/A"}
                </Text>
            </Group>
        </Card>
    );
};

export default TrailCard;
