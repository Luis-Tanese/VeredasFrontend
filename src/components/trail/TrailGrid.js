import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { SimpleGrid, Text, Group, TextInput, Select, Center } from "@mantine/core";
import { IconSearch, IconMoodSad } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { getAllTrails } from "../../services/trailService";
import TrailCard from "./TrailCard";
import TrailCardSkeleton from "./TrailCardSkeleton";
import InteractiveElement from "../common/InteractiveElement";

const normalizeString = (str) => {
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
};

const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.1,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100,
        },
    },
};

const TrailGrid = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [difficulty, setDifficulty] = useState("all");

    const {
        data: trails,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["trails"],
        queryFn: getAllTrails,
    });

    const filteredTrails = useMemo(() => {
        if (!trails) return [];

        let filtered = trails;

        if (difficulty !== "all") {
            filtered = filtered.filter((trail) => trail.stats.difficulty === difficulty);
        }

        if (searchQuery.trim() !== "") {
            const normalizedQuery = normalizeString(searchQuery);
            filtered = filtered.filter((trail) => {
                const searchableText = [trail.name, trail.city, trail.state].join(" ");
                return normalizeString(searchableText).includes(normalizedQuery);
            });
        }

        return filtered;
    }, [trails, searchQuery, difficulty]);

    if (isError) {
        return (
            <Text c="red" align="center">
                Erro ao carregar as trilhas. Tente novamente mais tarde.
            </Text>
        );
    }

    return (
        <>
            <Group justify="space-between" mb="xl">
                <TextInput
                    placeholder="Buscar por nome ou local..."
                    leftSection={<IconSearch size={16} />}
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.currentTarget.value)}
                    style={{ flex: 1, minWidth: "200px" }}
                />
                <Select
                    placeholder="Filtrar por dificuldade"
                    data={[
                        { value: "all", label: "Todas as Dificuldades" },
                        { value: "Fácil", label: "Fácil" },
                        { value: "Moderada", label: "Moderada" },
                        { value: "Difícil", label: "Difícil" },
                        { value: "Muito Difícil", label: "Muito Difícil" },
                    ]}
                    value={difficulty}
                    onChange={setDifficulty}
                    style={{ minWidth: "200px" }}
                />
            </Group>

            <SimpleGrid
                component={motion.div}
                initial="hidden"
                animate="visible"
                viewport={{ once: true }}
                variants={gridVariants}
                cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
                spacing="lg"
            >
                {isLoading && Array.from({ length: 8 }).map((_, index) => <TrailCardSkeleton key={index} />)}

                {!isLoading &&
                    filteredTrails.map((trail) => (
                        <motion.div key={trail.id} variants={cardVariants}>
                            <InteractiveElement>
                                <TrailCard trail={trail} />
                            </InteractiveElement>
                        </motion.div>
                    ))}
            </SimpleGrid>

            {!isLoading && filteredTrails.length === 0 && (
                <Center style={{ height: "200px" }}>
                    <Group>
                        <IconMoodSad size={32} />
                        <Text>Nenhuma trilha encontrada com esses critérios.</Text>
                    </Group>
                </Center>
            )}
        </>
    );
};

export default TrailGrid;
