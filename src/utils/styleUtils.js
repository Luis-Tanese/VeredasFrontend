export const getDifficultyColors = (difficulty) => {
    switch (difficulty) {
        case "Fácil":
            return { backgroundColor: "#87CEEB", color: "#000000" };
        case "Moderada":
            return { backgroundColor: "#ADFF2F", color: "#000000" };
        case "Difícil":
            return { backgroundColor: "#E44A9A", color: "#000000" };
        case "Muito Difícil":
            return { backgroundColor: "#181484", color: "#FFD700" };
        default:
            return { backgroundColor: "#E9ECEF", color: "#000000" };
    }
};
