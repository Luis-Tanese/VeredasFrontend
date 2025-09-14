import { Paper, Group, Avatar, Text, Badge } from "@mantine/core";
import styles from "./MemberCard.module.css";

const MemberCard = ({ name, role, photo, badgeColor }) => {
    return (
        <Paper withBorder p="md" radius="md" className={styles.memberCard}>
            <Group gap="md" align="center">
                <Avatar
                    src={photo}
                    alt={`${name} photo`}
                    size="lg"
                    radius="md"
                    className={styles.avatar}
                />
                <div className={styles.memberInfo}>
                    <Text fw={600} size="lg" className={styles.memberName}>
                        {name}
                    </Text>
                    <Badge
                        color={badgeColor}
                        variant="light"
                        size="md"
                        className={styles.roleBadge}
                    >
                        {role}
                    </Badge>
                </div>
            </Group>
        </Paper>
    );
};

export default MemberCard;