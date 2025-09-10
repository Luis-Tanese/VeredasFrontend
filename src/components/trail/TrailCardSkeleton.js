import { Card, Skeleton } from "@mantine/core";

const TrailCardSkeleton = () => {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
                <Skeleton height={180} />
            </Card.Section>
            <Skeleton height={16} mt="md" width="80%" />
            <Skeleton height={12} mt="sm" width="50%" />
            <Skeleton height={20} mt="md" width="30%" />
        </Card>
    );
};

export default TrailCardSkeleton;
