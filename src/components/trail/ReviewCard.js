import { Paper, Group, Avatar, Text, Rating, Stack, ActionIcon, Menu, Box } from "@mantine/core";
import { Link } from "react-router-dom";
import { IconDots, IconEdit, IconTrash } from "@tabler/icons-react";
import useAuthStore from "../../contexts/useAuthStore";
import classes from "./ReviewCard.module.css";

const ReviewCard = ({ review, onEdit, onDelete, lineClamp }) => {
    const { user } = useAuthStore();
    if (!review) return null;

    const { _id, userId, username, userProfilePic, rating, review: reviewText, createdAt, trailName, trailId } = review;

    const isOwner = user && user._id === userId;
    const canManage = isOwner && onEdit && onDelete;

    return (
        <Paper withBorder p="md" radius="md" className={classes.cardContainer}>
            <Stack className={classes.cardStack}>
                <Group justify="space-between">
                    <Group>
                        <Avatar src={userProfilePic} radius="xl">
                            {username?.charAt(0).toUpperCase()}
                        </Avatar>
                        <div>
                            <Text size="sm" fw={500}>
                                {username || "Usuário Anônimo"}
                            </Text>
                            <Text size="xs" c="dimmed">
                                {new Date(createdAt).toLocaleDateString("pt-BR")}
                            </Text>
                        </div>
                    </Group>
                    {canManage && (
                        <Menu shadow="md" width={200}>
                            <Menu.Target>
                                <ActionIcon variant="subtle">
                                    <IconDots size={16} />
                                </ActionIcon>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Item leftSection={<IconEdit size={14} />} onClick={() => onEdit(review)}>
                                    Editar
                                </Menu.Item>
                                <Menu.Item
                                    color="red"
                                    leftSection={<IconTrash size={14} />}
                                    onClick={() => onDelete(_id)}
                                >
                                    Excluir
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    )}
                </Group>

                <Rating value={rating} fractions={2} readOnly />

                <Box className={lineClamp ? classes.textContainer : classes.textContainerFull}>
                    <Text
                        size="sm"
                        c="earth.4"
                        className={lineClamp ? classes.clampedText : classes.fullText}
                        style={{
                            WebkitLineClamp: lineClamp || "unset",
                        }}
                    >
                        {reviewText}
                    </Text>
                </Box>

                {trailName && (
                    <Text size="xs" mt="auto" className={classes.trailLink}>
                        Em:{" "}
                        <Text component={Link} to={`/trilha/${trailId}`} variant="link" inherit>
                            {trailName}
                        </Text>
                    </Text>
                )}
            </Stack>
        </Paper>
    );
};

export default ReviewCard;
