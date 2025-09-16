import { useForm } from "@mantine/form";
import {
    Modal,
    TextInput,
    Textarea,
    Button,
    Stack,
    PasswordInput,
    Alert,
    Tabs,
    Grid,
    Avatar,
    Group,
    Text,
    Progress,
    Box,
} from "@mantine/core";
import {
    IconAlertCircle,
    IconUser,
    IconNotes,
    IconPhoto,
    IconLock,
    IconPassword,
    IconCheck,
} from "@tabler/icons-react";
import { useState } from "react";

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

const ProfileEditModal = ({ user, opened, onClose, onProfileSubmit, onPasswordSubmit, loading, error }) => {
    const [passwordError, setPasswordError] = useState(null);
    const [profileError, setProfileError] = useState(null);

    const profileForm = useForm({
        initialValues: {
            username: user.username || "",
            bio: user.bio || "",
            profilePicUrl: user.profilePicUrl || "",
        },
        validate: {
            username: (value) =>
                value.trim().length >= 3 ? null : "O nome de usuário deve ter pelo menos 3 caracteres",
        },
    });

    const passwordForm = useForm({
        initialValues: {
            currentPassword: "",
            newPassword: "",
        },
        validate: {
            currentPassword: (value) => (value ? null : "A senha atual é obrigatória"),
            newPassword: (value) => (value.length >= 8 ? null : "A nova senha deve ter pelo menos 8 caracteres"),
        },
    });

    const handleProfileSubmit = (values) => {
        setProfileError(null);
        const payload = {};
        Object.keys(values).forEach((key) => {
            if (values[key] && values[key].trim() !== (user[key] || "").trim()) {
                payload[key] = values[key];
            }
        });

        if (Object.keys(payload).length > 0) {
            onProfileSubmit(payload, (err) => {
                let errorMessage = "Ocorreu um erro.";
                if (err.errorCode && err.errorCode.errors && Array.isArray(err.errorCode.errors)) {
                    errorMessage = err.errorCode.errors.join(", ");
                } else if (err.message) {
                    errorMessage = err.message;
                }
                setProfileError(errorMessage);
            });
        }
    };

    const handlePasswordSubmit = (values) => {
        setPasswordError(null);
        onPasswordSubmit(
            values,
            (err) => setPasswordError(err),
            () => passwordForm.reset()
        );
    };

    return (
        <Modal opened={opened} onClose={onClose} title="Editar Perfil" size="xl">
            {/* Navegação por abas */}
            <Tabs defaultValue="profile">
                <Tabs.List>
                    <Tabs.Tab value="profile" leftSection={<IconUser size={16} />}>
                        Dados do Perfil
                    </Tabs.Tab>
                    <Tabs.Tab value="password" leftSection={<IconLock size={16} />}>
                        Alterar Senha
                    </Tabs.Tab>
                </Tabs.List>

                {/* Aba de Informações do Perfil */}
                <Tabs.Panel value="profile" pt="md">
                    <form onSubmit={profileForm.onSubmit(handleProfileSubmit)}>
                        {/* Grid para layout de duas colunas */}
                        <Grid gutter="xl">
                            {/* Coluna da esquerda: Pré-visualização do Avatar */}
                            <Grid.Col span={{ base: 12, md: 4 }}>
                                <Stack align="center">
                                    <Text size="sm" fw={500}>
                                        Pré-visualização
                                    </Text>
                                    <Avatar
                                        src={profileForm.values.profilePicUrl}
                                        size={150}
                                        radius="50%"
                                        alt="Pré-visualização da foto de perfil"
                                    >
                                        {profileForm.values.username.charAt(0).toUpperCase()}
                                    </Avatar>
                                </Stack>
                            </Grid.Col>

                            {/* Coluna da direita: Campos do Formulário */}
                            <Grid.Col span={{ base: 12, md: 8 }}>
                                <Stack>
                                    <TextInput
                                        label="Nome de Usuário"
                                        placeholder="Seu nome de usuário"
                                        required
                                        leftSection={<IconUser size={16} />}
                                        {...profileForm.getInputProps("username")}
                                    />
                                    <Textarea
                                        label="Biografia"
                                        placeholder="Conte um pouco sobre você"
                                        autosize
                                        minRows={3}
                                        maxLength={200} // Limite de caracteres
                                        leftSection={<IconNotes size={16} />}
                                        {...profileForm.getInputProps("bio")}
                                    />
                                    <TextInput
                                        label="URL da Foto de Perfil"
                                        placeholder="https://exemplo.com/avatar.png"
                                        leftSection={<IconPhoto size={16} />}
                                        {...profileForm.getInputProps("profilePicUrl")}
                                    />
                                    {profileError && (
                                        <Alert color="red" icon={<IconAlertCircle />}>
                                            {profileError}
                                        </Alert>
                                    )}
                                    <Button type="submit" loading={loading} mt="md">
                                        Salvar Alterações
                                    </Button>
                                </Stack>
                            </Grid.Col>
                        </Grid>
                    </form>
                </Tabs.Panel>

                {/* Aba de Alterar Senha */}
                <Tabs.Panel value="password" pt="md">
                    <form onSubmit={passwordForm.onSubmit(handlePasswordSubmit)}>
                        <Stack>
                            <PasswordInput
                                label="Senha Atual"
                                placeholder="Sua senha atual"
                                required
                                leftSection={<IconPassword size={16} />}
                                {...passwordForm.getInputProps("currentPassword")}
                            />
                            <PasswordInput
                                label="Nova Senha"
                                placeholder="Sua nova senha"
                                required
                                leftSection={<IconLock size={16} />}
                                {...passwordForm.getInputProps("newPassword")}
                            />

                            {/* Medidor de Força da Senha */}
                            {passwordForm.values.newPassword && (
                                <PasswordStrength value={passwordForm.values.newPassword} />
                            )}

                            {passwordError && (
                                <Alert color="red" icon={<IconAlertCircle />}>
                                    {passwordError}
                                </Alert>
                            )}
                            <Button type="submit" variant="outline" loading={loading} mt="md">
                                Alterar Senha
                            </Button>
                        </Stack>
                    </form>
                </Tabs.Panel>
            </Tabs>
        </Modal>
    );
};

export default ProfileEditModal;
