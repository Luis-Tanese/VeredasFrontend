import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "@mantine/form";
import {
    TextInput,
    PasswordInput,
    Button,
    Paper,
    Title,
    Stack,
    Alert,
    Container,
    Group,
    Text,
    Progress,
    Box,
} from "@mantine/core";
import { IconAlertCircle, IconCheck } from "@tabler/icons-react";
import useAuthStore from "../contexts/useAuthStore";
import TermsAndConditions from "../TermsAndConditions";

const PasswordStrength = ({ value }) => {
    const requirements = [
        { re: /[0-9]/, label: "Inclui um número" },
        { re: /[a-z]/, label: "Inclui uma letra minúscula" },
        { re: /[A-Z]/, label: "Inclui uma letra maiúscula" },
        { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Inclui um símbolo especial" },
    ];

    const getStrength = (password) => {
        let multiplier = password.length > 7 ? 0 : 1;
        requirements.forEach((requirement) => {
            if (!requirement.re.test(password)) {
                multiplier += 1;
            }
        });
        return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
    };

    const strength = getStrength(value);
    const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";

    const checks = requirements.map((requirement, index) => (
        <Text key={index} c={requirement.re.test(value) ? "teal" : "red"} mt={5} size="sm">
            <Group gap="xs">
                {requirement.re.test(value) ? <IconCheck size={14} /> : <IconAlertCircle size={14} />}
                <span>{requirement.label}</span>
            </Group>
        </Text>
    ));

    return (
        <Box>
            <Progress color={color} value={strength} size="sm" />
            <Text c={value.length > 7 ? "teal" : "red"} mt={5} size="sm">
                <Group gap="xs">
                    {value.length > 7 ? <IconCheck size={14} /> : <IconAlertCircle size={14} />}
                    <span>Ter pelo menos 8 caracteres</span>
                </Group>
            </Text>
            {checks}
        </Box>
    );
};

const RegisterPage = () => {
    const navigate = useNavigate();
    const { register } = useAuthStore();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const form = useForm({
        initialValues: {
            username: "",
            email: "",
            password: "",
        },
        validate: {
            username: (value) => (value.length >= 3 ? null : "O nome de usuário deve ter pelo menos 3 caracteres"),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : "Email inválido"),
            password: (value) => (value.length >= 8 ? null : "A senha deve ter pelo menos 8 caracteres"),
        },
    });

    const handleSubmit = async (values) => {
        setLoading(true);
        setError(null);
        try {
            await register(values);
            navigate("/");
        } catch (err) {
            let errorMessage = "Ocorreu um erro no cadastro. Tente novamente.";
            if (err.errorCode && err.errorCode.errors && Array.isArray(err.errorCode.errors)) {
                errorMessage = err.errorCode.errors.join(", ");
            } else if (err.message) {
                errorMessage = err.message;
            }
            setError(errorMessage);
            setLoading(false);
        }
    };

    return (
        <>
            <Container size={420} my={40}>
                <Title ta="center">Crie sua conta</Title>
                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                    <form onSubmit={form.onSubmit(handleSubmit)}>
                        <Stack>
                            {error && (
                                <Alert
                                    title="Erro de Cadastro"
                                    color="red"
                                    withCloseButton
                                    onClose={() => setError(null)}
                                >
                                    {error}
                                </Alert>
                            )}
                            <TextInput
                                required
                                label="Nome de usuário"
                                placeholder="Seu nome de usuário"
                                {...form.getInputProps("username")}
                            />
                            <TextInput
                                required
                                label="Email"
                                placeholder="seu@email.com"
                                {...form.getInputProps("email")}
                            />
                            <PasswordInput
                                required
                                label="Senha"
                                placeholder="Crie uma senha"
                                {...form.getInputProps("password")}
                            />
                            {form.values.password && <PasswordStrength value={form.values.password} />}
                            <TermsAndConditions />
                            <Button type="submit" loading={loading} fullWidth mt="sm">
                                Cadastrar
                            </Button>
                            <Button component={Link} to="/login" variant="subtle" fullWidth>
                                Já tem uma conta? Entre
                            </Button>
                        </Stack>
                    </form>
                </Paper>
            </Container>
        </>
    );
};

export default RegisterPage;
