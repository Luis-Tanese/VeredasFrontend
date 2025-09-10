import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useForm } from "@mantine/form";
import { TextInput, PasswordInput, Button, Paper, Title, Stack, Alert, Container } from "@mantine/core";
import useAuthStore from "../contexts/useAuthStore";

const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuthStore();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const from = location.state?.from?.pathname || "/";

    const form = useForm({
        initialValues: {
            email: "",
            password: "",
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : "Email inválido"),
            password: (value) => (value.length >= 6 ? null : "A senha deve ter pelo menos 6 caracteres"),
        },
    });

    const handleSubmit = async (values) => {
        setLoading(true);
        setError(null);
        try {
            await login(values);
            navigate(from, { replace: true });
        } catch (err) {
            setError(err.message || "Ocorreu um erro. Tente novamente.");
            setLoading(false);
        }
    };

    return (
        <>
            <Container size={420} my={40}>
                <Title ta="center">Bem-vindo(a) de volta!</Title>
                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                    <form onSubmit={form.onSubmit(handleSubmit)}>
                        <Stack>
                            {error && (
                                <Alert title="Erro de Login" color="red" withCloseButton onClose={() => setError(null)}>
                                    {error}
                                </Alert>
                            )}
                            <TextInput required label="Email" placeholder="seu@email.com" {...form.getInputProps("email")} />
                            <PasswordInput required label="Senha" placeholder="Sua senha" {...form.getInputProps("password")} />
                            <Button type="submit" loading={loading} fullWidth mt="xl">
                                Entrar
                            </Button>
                            <Button component={Link} to="/cadastro" variant="subtle" fullWidth>
                                Não tem conta? Cadastre-se
                            </Button>
                        </Stack>
                    </form>
                </Paper>
            </Container>
        </>
    );
};

export default LoginPage;
