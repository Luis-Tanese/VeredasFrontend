import { Container, Title, Divider } from "@mantine/core";
import FeaturedTrail from "../components/trail/FeaturedTrail";
import TrailGrid from "../components/trail/TrailGrid";
import RecentReviewsCarousel from "../components/trail/RecentReviewsCarousel";

const HomePage = () => {
    return (
        <>
            <FeaturedTrail />
            <Container size="xl" my="xl">
                <Title order={2} mb="lg">
                    Avaliações Recentes
                </Title>
                <RecentReviewsCarousel />

                <Divider my="xl" />

                <Title order={2} mb="lg">
                    Explore as Trilhas
                </Title>
                <TrailGrid />
            </Container>
        </>
    );
};

export default HomePage;
