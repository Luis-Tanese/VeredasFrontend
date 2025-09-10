import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getTrailById } from "../../services/trailService";
import { Skeleton, Overlay, Container, Title, Button, Text, Box } from "@mantine/core";
import classes from "./FeaturedTrail.module.css";
import InteractiveElement from "../common/InteractiveElement";

const FEATURED_TRAIL_ID = 1;

const FeaturedTrail = () => {
    const {
        data: trail,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["trail", FEATURED_TRAIL_ID],
        queryFn: () => getTrailById(FEATURED_TRAIL_ID),
    });

    if (isLoading) {
        return <Skeleton height={{ base: 350, sm: 400 }} />;
    }

    if (isError || !trail || !trail.images || trail.images.length === 0) {
        return null;
    }

    return (
        <Box
            className={classes.heroWrapper}
            style={{
                position: "relative",
                backgroundImage: `url(${trail.images[0]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <Overlay
                gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(4, 55, 57, 0.65) 90%)"
                opacity={0.85}
                zIndex={1}
            />

            <Container
                size="md"
                style={{
                    position: "relative",
                    zIndex: 2,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                }}
            >
                <Title order={1} c="white" mb="md" className={classes.heroTitle}>
                    {trail.name}
                </Title>
                <Text className={classes.heroText} c="white">
                    Descubra uma das nossas trilhas mais populares em {trail.city}, {trail.state}.
                </Text>
                <InteractiveElement smol>
                    <Button
                        component={Link}
                        to={`/trilha/${trail.id}`}
                        className={classes.heroButton}
                        variant="white"
                        color="dark"
                    >
                        Explorar Trilha
                    </Button>
                </InteractiveElement>
            </Container>
        </Box>
    );
};

export default FeaturedTrail;
