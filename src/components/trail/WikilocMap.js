import { Box } from "@mantine/core";
import classes from "./WikilocMap.module.css";

const WikilocMap = ({ iframeData }) => {
    if (!iframeData || !iframeData.attributes || !iframeData.attributes.src) {
        return <p>Mapa não disponível.</p>;
    }

    const { frameborder, scrolling, src, width, height } = iframeData.attributes;

    return (
        <Box className={classes.mapContainer}>
            <iframe
                title="Wikiloc Map"
                src={src}
                width={width}
                height={height}
                frameBorder={frameborder}
                scrolling={scrolling}
                className={classes.responsiveIframe}
            />
        </Box>
    );
};

export default WikilocMap;
