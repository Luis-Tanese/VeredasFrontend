import { Paper, Title } from "@mantine/core";
import styles from "./MapComponent.module.css";

const MapComponent = () => {
    return (
        <Paper withBorder p="xl" radius="md">
            <Title order={3} mb="md" ta="center">
                Localização da Empresa
            </Title>
            <div className={styles.mapContainer}>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1487.322609919649!2d-48.49820184782211!3d-27.547943331609748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x952747d1e678cccf%3A0xcb4f738cfb1aa497!2sEscola%20SESI%20-%20Florian%C3%B3polis!5e0!3m2!1spt-BR!2sbr!4v1757603479900!5m2!1spt-BR!2sbr"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Localização da Empresa - Escola SESI Florianópolis"
                    className={styles.mapIframe}
                />
            </div>
        </Paper>
    );
};

export default MapComponent;
