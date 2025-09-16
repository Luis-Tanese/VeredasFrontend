import { useState } from "react";
import { Carousel } from "@mantine/carousel";
import { Image, Modal, UnstyledButton, ActionIcon, Box } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconX, IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import InteractiveElement from "../common/InteractiveElement";

const ImageCarousel = ({ images }) => {
    const [modalOpened, setModalOpened] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const isMobile = useMediaQuery(`(max-width: 768px)`);

    if (!images || images.length === 0) {
        return null;
    }

    const openModal = (index) => {
        setActiveIndex(index);
        setModalOpened(true);
    };

    const closeModal = () => setModalOpened(false);

    const handleNext = () => {
        setActiveIndex((current) => (current + 1) % images.length);
    };

    const handlePrev = () => {
        setActiveIndex((current) => (current - 1 + images.length) % images.length);
    };

    const slides = images.map((image, index) => (
        <Carousel.Slide key={index}>
            <InteractiveElement smol>
                <UnstyledButton onClick={() => openModal(index)} w="100%">
                    <Image src={image} height={200} fit="cover" alt={`Visualização da trilha ${index + 1}`} />
                </UnstyledButton>
            </InteractiveElement>
        </Carousel.Slide>
    ));

    return (
        <>
            <Carousel
                slideSize={{ base: "50%", sm: "33.33%" }}
                slideGap={{ base: "sm", sm: "md" }}
                align="start"
                slidesToScroll={isMobile ? 1 : 3}
                withIndicators
                loop
                styles={{
                    control: {
                        "&[dataInactive]": { opacity: 0, cursor: "default" },
                        backgroundColor: "white",
                        "&[dataActive]": {
                            backgroundColor: "white",
                        },
                    },
                }}
            >
                {slides}
            </Carousel>

            <Modal
                opened={modalOpened}
                onClose={closeModal}
                fullScreen
                withCloseButton={false}
                padding={0}
                styles={{
                    body: {
                        height: "100vh",
                        width: "100vw",
                        backgroundColor: "rgba(0, 0, 0, 0.85)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "auto",
                    },
                }}
            >
                <Box style={{ maxWidth: "90vw", maxHeight: "90vh" }}>
                    <Image src={images[activeIndex]} alt={`Imagem ${activeIndex + 1} da trilha`} />
                </Box>

                <ActionIcon
                    variant="transparent"
                    color="white"
                    onClick={closeModal}
                    style={{ position: "absolute", top: 15, right: 15 }}
                    size="xl"
                >
                    <IconX size={40} />
                </ActionIcon>
                <ActionIcon
                    variant="transparent"
                    color="white"
                    onClick={handlePrev}
                    style={{ position: "absolute", top: "50%", left: 15, transform: "translateY(-50%)" }}
                    size="xl"
                >
                    <IconChevronLeft size={40} />
                </ActionIcon>
                <ActionIcon
                    variant="transparent"
                    color="white"
                    onClick={handleNext}
                    style={{ position: "absolute", top: "50%", right: 15, transform: "translateY(-50%)" }}
                    size="xl"
                >
                    <IconChevronRight size={40} />
                </ActionIcon>
            </Modal>
        </>
    );
};

export default ImageCarousel;
