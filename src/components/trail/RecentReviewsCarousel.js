import { useQuery } from "@tanstack/react-query";
import { Carousel } from "@mantine/carousel";
import { Loader, Text, Center } from "@mantine/core";
import { motion } from "framer-motion";
import { getAllReviews } from "../../services/reviewService";
import ReviewCard from "./ReviewCard";
import useAuthStore from "../../contexts/useAuthStore";

const RecentReviewsCarousel = () => {
    const { user } = useAuthStore();
    const {
        data: reviews,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["reviews"],
        queryFn: getAllReviews,
    });

    if (isLoading) {
        return (
            <Center>
                <Loader />
            </Center>
        );
    }

    if (isError || !reviews || reviews.length === 0) {
        return (
            <Text c="dimmed" ta="center">
                Nenhuma avaliação recente encontrada.
            </Text>
        );
    }

    const recentReviews = reviews.slice(0, 7);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            <Carousel
                withIndicators
                slideSize={{ base: "100%", sm: "50%", md: "33.333333%" }}
                slideGap={{ base: "md", sm: "lg" }}
                loop
                align="start"
                styles={{
                    control: {
                        "&[data-inactive]": { opacity: 0, cursor: "default" },
                        top: "calc(50% - 15px)",
                    },
                }}
            >
                {recentReviews.map((review) => {
                    const displayReview =
                        user && review.userId === user._id
                            ? { ...review, username: user.username, userProfilePic: user.profilePicUrl }
                            : review;

                    return (
                        <Carousel.Slide key={review._id} style={{ height: "250px" }}>
                            <ReviewCard review={displayReview} lineClamp={4} />
                        </Carousel.Slide>
                    );
                })}
            </Carousel>
        </motion.div>
    );
};

export default RecentReviewsCarousel;
