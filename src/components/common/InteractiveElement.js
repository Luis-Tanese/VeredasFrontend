import { motion } from "framer-motion";

const InteractiveElement = ({ children, smol = false }) => {
    const normalHover = { scale: 1.03, y: -5 };
    const smallHover = { scale: 1.01, y: 0 };

    const hoverEffect = smol ? smallHover : normalHover;

    return (
        <motion.div
            whileHover={hoverEffect}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
            {children}
        </motion.div>
    );
};

export default InteractiveElement;
