import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { openConfirmModal } from "@mantine/modals";

import { getTrailById, getTrailDownloadUrl } from "../services/trailService";
import { createReview, updateReview, deleteReview } from "../services/reviewService";
import { toggleFavorite } from "../services/userService";
import useAuthStore from "../contexts/useAuthStore";

import {
    Container,
    Grid,
    SimpleGrid,
    Title,
    Text,
    Badge,
    Paper,
    Group,
    Stack,
    Divider,
    Center,
    Loader,
    Alert,
    Button,
    Modal,
    ActionIcon,
    Tooltip,
    Box,
    UnstyledButton,
} from "@mantine/core";
import {
    IconMapPin,
    IconRulerMeasure,
    IconArrowUpRight,
    IconClock,
    IconAlertCircle,
    IconPencil,
    IconPlus,
    IconHeart,
    IconHeartFilled,
    IconDownload,
    IconGps,
    IconMapSearch,
} from "@tabler/icons-react";

import WikilocMap from "../components/trail/WikilocMap";
import ReviewCard from "../components/trail/ReviewCard";
import ReviewForm from "../components/trail/ReviewForm";
import ImageCarousel from "../components/trail/ImageCarousel";
import AuthorCard from "../components/trail/AuthorCard";
import classes from "./TrailDetailPage.module.css";
import { getDifficultyColors } from "../utils/styleUtils";
import downloadClasses from "./DownloadModal.module.css";
import InteractiveElement from "../components/common/InteractiveElement";

const StatCard = ({ icon, label, value }) => (
    <Paper withBorder p="md" radius="md">
        <Group>
            {icon}
            <div>
                <Text c="dimmed" size="xs">
                    {label}
                </Text>
                <Text fw={500}>{value}</Text>
            </div>
        </Group>
    </Paper>
);

const TrailDetailPage = () => {
    const { id } = useParams();
    const isMobile = useMediaQuery(`(max-width: 768px)`);

    const { user, isAuthenticated, updateUser } = useAuthStore();
    const queryClient = useQueryClient();

    const [downloadModalOpened, { open: openDownloadModal, close: closeDownloadModal }] = useDisclosure(false);
    const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);
    const [reviewToEdit, setReviewToEdit] = useState(null);

    const {
        data: trail,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["trail", id],
        queryFn: () => getTrailById(id),
        retry: false,
    });

    const { mutate: handleToggleFavorite, isPending: isFavoriting } = useMutation({
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
            queryClient.invalidateQueries({ queryKey: ["trails"] });
        },
    });

    const { mutate: handleCreateReview, isPending: isCreating } = useMutation({
        mutationFn: createReview,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["trail", id] });
            closeModal();
        },
    });

    const { mutate: handleUpdateReview, isPending: isUpdating } = useMutation({
        mutationFn: updateReview,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["trail", id] });
            closeModal();
            setReviewToEdit(null);
        },
    });

    const { mutate: handleDeleteReview } = useMutation({
        mutationFn: deleteReview,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["trail", id] });
        },
    });

    const openEditModal = (review) => {
        setReviewToEdit(review);
        openModal();
    };
    const openCreateModal = () => {
        setReviewToEdit(null);
        openModal();
    };
    const handleFormSubmit = (values) => {
        if (reviewToEdit) {
            handleUpdateReview({ reviewId: reviewToEdit._id, updateData: values });
        } else {
            handleCreateReview({ ...values, trailId: trail.id, trailName: trail.name });
        }
    };
    const openDeleteConfirmModal = (reviewId) =>
        openConfirmModal({
            title: "Confirmar exclusão",
            children: <Text size="sm">Você tem certeza que quer excluir sua avaliação? Esta ação é irreversível.</Text>,
            labels: { confirm: "Excluir", cancel: "Cancelar" },
            confirmProps: { color: "red" },
            onConfirm: () => handleDeleteReview(reviewId),
        });

    if (isLoading)
        return (
            <Center style={{ height: "80vh" }}>
                <Loader />
            </Center>
        );
    if (isError)
        return (
            <Container my="xl">
                <Alert icon={<IconAlertCircle size="1rem" />} title="Erro!" color="red">
                    {error.status === 404 ? "Trilha não encontrada." : "Não foi possível carregar os dados da trilha."}
                </Alert>
            </Container>
        );
    if (!trail) return null;

    const difficultyColors = getDifficultyColors(trail.stats.difficulty);

    const isFavorited = user?.favorites?.includes(trail.id);
    const userReview = trail?.reviews?.find((r) => r.userId === user?._id);

    const AUTHOR_CARD_HEIGHT = 100;
    const TOTAL_STICKY_HEIGHT = 800;
    const IFRAME_HEIGHT = TOTAL_STICKY_HEIGHT - AUTHOR_CARD_HEIGHT;

    const desktopIframe = {
        ...trail.iframe,
        attributes: { ...trail.iframe.attributes, width: "600", height: IFRAME_HEIGHT },
    };
    const mobileIframe = { ...trail.iframe, attributes: { ...trail.iframe.attributes, width: "600", height: "600" } };

    return (
        <>
            <Modal
                opened={modalOpened}
                onClose={closeModal}
                title={reviewToEdit ? "Editar Avaliação" : "Escrever Avaliação"}
            >
                <ReviewForm
                    onSubmit={handleFormSubmit}
                    onCancel={closeModal}
                    existingReview={reviewToEdit}
                    loading={isCreating || isUpdating}
                />
            </Modal>

            <Modal
                opened={downloadModalOpened}
                onClose={closeDownloadModal}
                title={<Title order={4}>Baixar Arquivos da Trilha</Title>}
                centered
                size="md"
            >
                <Stack>
                    <UnstyledButton
                        component="a"
                        href={getTrailDownloadUrl(trail.id, "gpx")}
                        className={downloadClasses.downloadOption}
                        download
                    >
                        <Group>
                            <IconGps size={40} stroke={1.5} />
                            <div>
                                <Text fw={500}>Arquivo GPX</Text>
                                <Text size="sm" c="dimmed">
                                    Para dispositivos GPS e apps de navegação
                                </Text>
                            </div>
                        </Group>
                    </UnstyledButton>

                    <UnstyledButton
                        component="a"
                        href={getTrailDownloadUrl(trail.id, "kml")}
                        className={downloadClasses.downloadOption}
                        download
                    >
                        <Group>
                            <IconMapSearch size={40} stroke={1.5} />
                            <div>
                                <Text fw={500}>Arquivo KML</Text>
                                <Text size="sm" c="dimmed">
                                    Para Google Earth e outros visualizadores de mapa
                                </Text>
                            </div>
                        </Group>
                    </UnstyledButton>
                </Stack>
            </Modal>

            <Container size="xl" my="xl">
                <Grid gutter="xl">
                    <Grid.Col span={{ base: 12, md: 8 }}>
                        <Stack>
                            <Group justify="space-between">
                                <Title order={1}>{trail.name}</Title>
                                <Group>
                                    <InteractiveElement smol>
                                        <Button
                                            leftSection={<IconDownload size={16} />}
                                            variant="default"
                                            onClick={openDownloadModal}
                                        >
                                            Baixar
                                        </Button>
                                    </InteractiveElement>

                                    {isAuthenticated && (
                                        <InteractiveElement smol>
                                            <Tooltip
                                                label={
                                                    isFavorited ? "Remover dos Favoritos" : "Adicionar aos Favoritos"
                                                }
                                            >
                                                <ActionIcon
                                                    size="lg"
                                                    variant="default"
                                                    radius="xl"
                                                    onClick={() => handleToggleFavorite(trail.id)}
                                                    loading={isFavoriting}
                                                >
                                                    {isFavorited ? (
                                                        <IconHeartFilled style={{ color: "red" }} />
                                                    ) : (
                                                        <IconHeart />
                                                    )}
                                                </ActionIcon>
                                            </Tooltip>
                                        </InteractiveElement>
                                    )}
                                </Group>
                            </Group>

                            <Group>
                                <IconMapPin size={18} />
                                <Text>
                                    {trail.city}, {trail.state}
                                </Text>
                                <Badge
                                    variant="filled"
                                    style={{
                                        backgroundColor: difficultyColors.backgroundColor,
                                        color: difficultyColors.color,
                                    }}
                                >
                                    {trail.stats.difficulty}
                                </Badge>
                            </Group>

                            <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} mt="md">
                                <StatCard icon={<IconRulerMeasure />} label="Distância" value={trail.stats.distance} />
                                <StatCard
                                    icon={<IconArrowUpRight />}
                                    label="Ganho de Elevação"
                                    value={trail.stats.elevationGain}
                                />
                                <StatCard icon={<IconClock />} label="Duração Média" value={trail.duration} />
                            </SimpleGrid>

                            {isMobile && (
                                <Box mt="xl">
                                    <Stack>
                                        <AuthorCard author={trail.author} />
                                        <WikilocMap iframeData={mobileIframe} />
                                    </Stack>
                                </Box>
                            )}

                            <Paper withBorder p="md" mt="xl">
                                <Title order={4} mb="sm">
                                    Descrição
                                </Title>
                                <Text style={{ whiteSpace: "pre-wrap" }}>{trail.description}</Text>
                            </Paper>
                            <Paper withBorder p="md" mt="lg">
                                <Title order={4} mb="sm">
                                    Orientações
                                </Title>
                                <Text style={{ whiteSpace: "pre-wrap" }}>{trail.orientations}</Text>
                            </Paper>

                            <Divider my="xl" label="Galeria de Fotos" labelPosition="center" />
                            <ImageCarousel images={trail.images} />

                            <Divider my="xl" label="Avaliações de Usuários" labelPosition="center" />
                            {isAuthenticated && (
                                <Group justify="center" mb="lg">
                                    {userReview ? (
                                        <Button
                                            leftSection={<IconPencil size={14} />}
                                            variant="outline"
                                            onClick={() => openEditModal(userReview)}
                                        >
                                            Editar sua Avaliação
                                        </Button>
                                    ) : (
                                        <Button leftSection={<IconPlus size={14} />} onClick={openCreateModal}>
                                            Escrever uma Avaliação
                                        </Button>
                                    )}
                                </Group>
                            )}
                            {trail.reviews && trail.reviews.length > 0 ? (
                                <Stack>
                                    {trail.reviews.map((review) => (
                                        <ReviewCard
                                            key={review._id}
                                            review={review}
                                            onEdit={openEditModal}
                                            onDelete={openDeleteConfirmModal}
                                        />
                                    ))}
                                </Stack>
                            ) : (
                                <Text ta="center" c="dimmed">
                                    Esta trilha ainda não tem avaliações. Seja o primeiro a avaliar!
                                </Text>
                            )}
                        </Stack>
                    </Grid.Col>

                    {!isMobile && (
                        <Grid.Col span={{ base: 12, md: 4 }}>
                            <div className={classes.stickyMapContainer}>
                                <Stack>
                                    <AuthorCard author={trail.author} />
                                    <WikilocMap iframeData={desktopIframe} />
                                </Stack>
                            </div>
                        </Grid.Col>
                    )}
                </Grid>
            </Container>
        </>
    );
};

export default TrailDetailPage;
