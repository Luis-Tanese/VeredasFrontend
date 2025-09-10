import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Container, Loader, Center } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";

import useAuthStore from "../contexts/useAuthStore";
import { getMyReviews, updateProfile, changePassword } from "../services/userService";
import { getAllTrails } from "../services/trailService";

import ProfileHeader from "../components/user/ProfileHeader";
import ProfileTabs from "../components/user/ProfileTabs";
import ProfileEditModal from "../components/user/ProfileEditModal";

const ProfilePage = () => {
    const { user, updateUser } = useAuthStore();
    const queryClient = useQueryClient();
    const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);

    const { data: userReviews, isLoading: isLoadingReviews } = useQuery({
        queryKey: ["myReviews", user._id],
        queryFn: getMyReviews,
    });

    const { data: allTrails, isLoading: isLoadingTrails } = useQuery({
        queryKey: ["trails"],
        queryFn: getAllTrails,
    });

    const { mutate: handleUpdateProfile, isPending: isUpdatingProfile } = useMutation({
        mutationFn: updateProfile,
        onSuccess: (updatedUser) => {
            updateUser(updatedUser);

            queryClient.invalidateQueries({ queryKey: ["reviews"] });
            queryClient.invalidateQueries({ queryKey: ["myReviews"] });

            notifications.show({
                title: "Sucesso",
                message: "Seu perfil foi atualizado com sucesso!",
                color: "green",
            });
            closeModal();
        },
        onError: (error) => {},
    });

    const { mutate: handleChangePassword, isPending: isChangingPassword } = useMutation({
        mutationFn: changePassword,
        onSuccess: (data, variables) => {
            notifications.show({
                title: "Sucesso",
                message: "Sua senha foi alterada com sucesso!",
                color: "green",
            });
            variables.onSuccess();
        },
        onError: (error, variables) => {
            variables.onError(error.message || "Erro desconhecido");
        },
    });

    const onProfileSubmit = (values, onErrorCallback) => {
        handleUpdateProfile(values, {
            onError: (error) => {
                onErrorCallback(error.message || "Erro desconhecido ao atualizar perfil.");
            },
        });
    };

    const onPasswordSubmit = (values, onErrorCallback, onSuccessCallback) => {
        handleChangePassword({ ...values, onError: onErrorCallback, onSuccess: onSuccessCallback });
    };

    if (isLoadingReviews || isLoadingTrails) {
        return (
            <Center style={{ height: "80vh" }}>
                <Loader />
            </Center>
        );
    }

    const favoriteTrails = allTrails?.filter((trail) => user.favorites.includes(trail.id)) || [];

    return (
        <>
            <ProfileEditModal
                user={user}
                opened={modalOpened}
                onClose={closeModal}
                onProfileSubmit={onProfileSubmit}
                onPasswordSubmit={onPasswordSubmit}
                loading={isUpdatingProfile || isChangingPassword}
            />
            <Container size="xl" my="xl">
                <ProfileHeader user={user} reviewCount={userReviews?.length || 0} onEditClick={openModal} />
                <ProfileTabs userReviews={userReviews} favoriteTrails={favoriteTrails} />
            </Container>
        </>
    );
};

export default ProfilePage;
