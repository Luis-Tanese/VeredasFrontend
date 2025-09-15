import { SimpleGrid, Paper, Text, Stack } from "@mantine/core";
import {
    IconRulerMeasure,
    IconArrowUpRight,
    IconArrowDownRight,
    IconTrendingUp,
    IconTrendingDown,
    IconArrowsShuffle,
    IconClock,
} from "@tabler/icons-react";
import InteractiveElement from "../common/InteractiveElement";
import classes from "./StatsGrid.module.css";

const statDetails = {
    distance: { label: "Distância", icon: <IconRulerMeasure /> },
    elevationGain: { label: "Ganho de Elevação", icon: <IconArrowUpRight /> },
    elevationLoss: { label: "Perda de Elevação", icon: <IconArrowDownRight /> },
    maximumElevation: { label: "Elevação Máxima", icon: <IconTrendingUp /> },
    minimumElevation: { label: "Elevação Mínima", icon: <IconTrendingDown /> },
    trailType: { label: "Tipo de Percurso", icon: <IconArrowsShuffle /> },
};

const StatItem = ({ statKey, value }) => {
    const details = statDetails[statKey];
    if (!details) return null;

    return (
        <Stack align="center" gap={4}>
            {details.icon}
            <Text c="dimmed" size="xs" ta="center" style={classes.statGrid}>
                {details.label}
            </Text>
            <Text fw={500} size="lg" ta="center" style={classes.statGrid}>
                {value}
            </Text>
        </Stack>
    );
};

const StatsGrid = ({ stats, duration }) => {
    if (!stats) return null;

    const statItems = Object.keys(statDetails)
        .filter((key) => stats[key])
        .map((key) => (
            <InteractiveElement key={key}>
                <Paper withBorder p="md" radius="md" h="100%" style={classes.statGrid}>
                    <StatItem statKey={key} value={stats[key]} />
                </Paper>
            </InteractiveElement>
        ));

    return (
        <SimpleGrid cols={{ base: 2, sm: 3, lg: 4 }} mt="md">
            <InteractiveElement>
                <Paper withBorder p="md" radius="md" h="100%" style={classes.statGrid}>
                    <Stack align="center" gap={4}>
                        <IconClock size={24} />
                        <div>
                            <Text c="dimmed" size="xs" ta="center" style={classes.statGrid}>
                                Duração Média
                            </Text>
                            <Text fw={500} size="lg" ta="center" style={classes.statGrid}>
                                {duration}
                            </Text>
                        </div>
                    </Stack>
                </Paper>
            </InteractiveElement>
            {statItems}
        </SimpleGrid>
    );
};

export default StatsGrid;
