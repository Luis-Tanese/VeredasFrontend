import { Link } from "react-router-dom";
import { Card, Image, Text, Group, Badge, Rating, Stack } from "@mantine/core";
import { IconMapPin } from "@tabler/icons-react";
import classes from "./TrailCard.module.css";
import { getDifficultyColors } from "../../utils/styleUtils";

const TrailCard = ({ trail }) => {
    if (!trail || !trail.stats) {
        return null;
    }

    const { id, name, images, city, state, stats, reviewStats } = trail;

    const imageUrl = images && images.length > 0 ? images[0] : null;

    const difficultyColors = getDifficultyColors(stats.difficulty);

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
