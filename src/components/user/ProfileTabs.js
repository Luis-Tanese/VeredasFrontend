import { Tabs, Text, SimpleGrid, Center, Group } from "@mantine/core";
import { IconMessageCircle, IconHeart, IconMoodSad } from "@tabler/icons-react";
import ReviewCard from "../trail/ReviewCard";
import TrailCard from "../trail/TrailCard";
import useAuthStore from "../../contexts/useAuthStore";

const ProfileTabs = ({ userReviews, favoriteTrails }) => {
    const { user } = useAuthStore();
    const syncedUserReviews = userReviews?.map((review) => ({
        ...review,
        username: user.username,
        userProfilePic: user.profilePicUrl,
    }));

    return (
        <Tabs defaultValue="reviews" mt="xl">
            <Tabs.List>
                <Tabs.Tab value="reviews" leftSection={<IconMessageCircle size={16} />}>
                    Minhas Avaliações
                </Tabs.Tab>
                <Tabs.Tab value="favorites" leftSection={<IconHeart size={16} />}>
                    Trilhas Favoritas
                </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="reviews" pt="md">
                {syncedUserReviews && syncedUserReviews.length > 0 ? (
                    <SimpleGrid cols={{ base: 1, sm: 2 }}>
                        {syncedUserReviews.map((review) => (
                            <ReviewCard key={review._id} review={review} />
                        ))}
                    </SimpleGrid>
                ) : (
                    <Center h={200}>
                        <Group>
                            <IconMoodSad />
                            <Text c="dimmed">Você ainda não escreveu nenhuma avaliação.</Text>
                        </Group>
                    </Center>
                )}
            </Tabs.Panel>

            <Tabs.Panel value="favorites" pt="md">
                {favoriteTrails && favoriteTrails.length > 0 ? (
                    <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }}>
                        {favoriteTrails.map((trail) => (
                            <TrailCard key={trail.id} trail={trail} />
                        ))}
                    </SimpleGrid>
                ) : (
                    <Center h={200}>
                        <Group>
                            <IconMoodSad />
                            <Text c="dimmed">Você ainda não favoritou nenhuma trilha.</Text>
                        </Group>
                    </Center>
                )}
            </Tabs.Panel>
        </Tabs>
    );
};

export default ProfileTabs;
