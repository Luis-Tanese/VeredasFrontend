import { useForm } from "@mantine/form";
import { Button, Group, Rating, Textarea, Stack } from "@mantine/core";

const ReviewForm = ({ onSubmit, onCancel, existingReview, loading }) => {
    const form = useForm({
        initialValues: {
            rating: existingReview?.rating || 0,
            review: existingReview?.review || "",
        },
        validate: {
            rating: (value) => (value > 0 ? null : "A avaliação é obrigatória"),
            review: (value) => (value.trim().length > 0 ? null : "O texto da avaliação não pode estar vazio"),
        },
    });

    const handleSubmit = (values) => {
        onSubmit(values);
    };

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
                <Rating {...form.getInputProps("rating")} fractions={2} size="xl" />
                <Textarea
                    label="Sua Avaliação"
                    placeholder="Descreva sua experiência na trilha..."
                    autosize
                    minRows={4}
                    required
                    {...form.getInputProps("review")}
                />
                <Group justify="flex-end" mt="md">
                    <Button variant="default" onClick={onCancel}>
                        Cancelar
                    </Button>
                    <Button type="submit" loading={loading}>
                        {existingReview ? "Salvar Alterações" : "Enviar Avaliação"}
                    </Button>
                </Group>
            </Stack>
        </form>
    );
};

export default ReviewForm;
