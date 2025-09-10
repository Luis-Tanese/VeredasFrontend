import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Spotlight } from "@mantine/spotlight";
import { getAllTrails } from "../../services/trailService";
import { IconMapPin, IconSearch } from "@tabler/icons-react";
import { rem, Group, Center, Text } from "@mantine/core";

import customClasses from "./SpotlightCustom.module.css";

const normalizeString = (str) =>
    str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

const SpotlightManager = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const { data: trails, isLoading } = useQuery({
        queryKey: ["trails"],
        queryFn: getAllTrails,
    });

    const filteredTrails = trails
        ? trails.filter((trail) => {
              const searchableText = normalizeString(`${trail.name} ${trail.city} ${trail.state}`);
              const normalizedQuery = normalizeString(query);
              return searchableText.includes(normalizedQuery.trim());
          })
        : [];

    const actions = filteredTrails.slice(0, 5).map((trail) => (
        <Spotlight.Action
            key={trail.id}
            onClick={() => {
                navigate(`/trilha/${trail.id}`);
                Spotlight.close();
            }}
        >
            <Group wrap="nowrap" w="100%">
                <Center>
                    <IconMapPin style={{ width: 45, height: 45 }} />
                </Center>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <Text>{trail.name}</Text>
                    <Text opacity={0.6} size="xs">
                        {trail.city}, {trail.state}
                    </Text>
                </div>
            </Group>
        </Spotlight.Action>
    ));

    return (
        <Spotlight.Root
            query={query}
            onQueryChange={setQuery}
            shortcut={["mod + K", "ctrl + K", "/"]}
            lockScroll={false}
            classNames={{
                action: customClasses.actionCustom,
            }}
        >
            <Spotlight.Search
                placeholder="Buscar por nome ou local..."
                leftSection={<IconSearch style={{ width: rem(20), height: rem(20) }} stroke={1.5} />}
            />
            <Spotlight.ActionsList>
                {isLoading && <Spotlight.Empty>Carregando trilhas...</Spotlight.Empty>}
                {!isLoading && actions.length > 0
                    ? actions
                    : !isLoading && <Spotlight.Empty>Nenhuma trilha encontrada.</Spotlight.Empty>}
            </Spotlight.ActionsList>
        </Spotlight.Root>
    );
};

export default SpotlightManager;
