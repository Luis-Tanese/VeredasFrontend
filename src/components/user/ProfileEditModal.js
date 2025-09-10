import { useForm } from "@mantine/form";
import { Modal, TextInput, Textarea, Button, Stack, Divider, PasswordInput, Alert } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { useState } from "react";

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
            username: (value) => (value.trim().length >= 3 ? null : "Nome de usuário deve ter pelo menos 3 caracteres"),
        },
    });

    const passwordForm = useForm({
        initialValues: {
            currentPassword: "",
            newPassword: "",
        },
        validate: {
            currentPassword: (value) => (value ? null : "Senha atual é obrigatória"),
            newPassword: (value) => (value.length >= 6 ? null : "Nova senha deve ter pelo menos 6 caracteres"),
        },
    });

    const handleProfileSubmit = (values) => {
        setProfileError(null);

        const payload = {};

        Object.keys(values).forEach((key) => {
            if (values[key] && values[key].trim() !== "") {
                payload[key] = values[key];
            }
        });

        onProfileSubmit(payload, (err) => {
            let errorMessage = "Ocorreu um erro.";
            if (err.errorCode && err.errorCode.errors && Array.isArray(err.errorCode.errors)) {
                errorMessage = err.errorCode.errors.join(", ");
            } else if (err.message) {
                errorMessage = err.message;
            }
            setProfileError(errorMessage);
        });
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
        <Modal opened={opened} onClose={onClose} title="Editar Perfil" size="lg">
            <form onSubmit={profileForm.onSubmit(handleProfileSubmit)}>
                <Stack>
                    <TextInput
                        label="Nome de Usuário"
                        placeholder="Seu nome de usuário"
                        required
                        {...profileForm.getInputProps("username")}
                    />
                    <Textarea
                        label="Biografia"
                        placeholder="Conte um pouco sobre você"
                        autosize
                        minRows={3}
                        {...profileForm.getInputProps("bio")}
                    />
                    <TextInput
                        label="URL da Foto de Perfil"
                        placeholder="https://example.com/avatar.png"
                        {...profileForm.getInputProps("profilePicUrl")}
                    />
                    {profileError && (
                        <Alert color="red" icon={<IconAlertCircle />}>
                            {profileError}
                        </Alert>
                    )}
                    <Button type="submit" loading={loading}>
                        Salvar Alterações
                    </Button>
                </Stack>
            </form>

            <Divider my="xl" label="Alterar Senha" labelPosition="center" />

            <form onSubmit={passwordForm.onSubmit(handlePasswordSubmit)}>
                <Stack>
                    <PasswordInput
                        label="Senha Atual"
                        placeholder="Sua senha atual"
                        required
                        {...passwordForm.getInputProps("currentPassword")}
                    />
                    <PasswordInput
                        label="Nova Senha"
                        placeholder="Sua nova senha"
                        required
                        {...passwordForm.getInputProps("newPassword")}
                    />
                    {passwordError && (
                        <Alert color="red" icon={<IconAlertCircle />}>
                            {passwordError}
                        </Alert>
                    )}
                    <Button type="submit" variant="outline" loading={loading}>
                        Alterar Senha
                    </Button>
                </Stack>
            </form>
        </Modal>
    );
};

export default ProfileEditModal;
