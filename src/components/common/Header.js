import { NavLink, useNavigate } from "react-router-dom";
import {
    Container,
    Group,
    Burger,
    Button,
    Menu,
    Avatar,
    Image,
    Drawer,
    Stack,
    Divider,
    UnstyledButton,
    Kbd,
    Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { spotlight } from "@mantine/spotlight";
import { IconSearch, IconUser, IconLogout, IconHome, IconInfoCircle } from "@tabler/icons-react";
import useAuthStore from "../../contexts/useAuthStore";
import logo from "../../assets/logo.png";
import classes from "./Header.module.css";
import InteractiveElement from "./InteractiveElement";

const Header = () => {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const { isAuthenticated, user, logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const userMenu = (
        <Menu shadow="md" width={200}>
            <InteractiveElement smol>
                <Menu.Target>
                    <Avatar src={user?.profilePicUrl} radius="xl" style={{ cursor: "pointer" }} size={40}>
                        {user?.username.charAt(0).toUpperCase()}
                    </Avatar>
                </Menu.Target>
            </InteractiveElement>

            <Menu.Dropdown>
                <Menu.Label>{user?.username}</Menu.Label>
                <Menu.Item leftSection={<IconUser size={14} />} component={NavLink} to="/perfil">
                    Meu Perfil
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item color="red" leftSection={<IconLogout size={14} />} onClick={handleLogout}>
                    Sair
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );

    const authButtons = (
        <Group>
            <InteractiveElement smol>
                <Button component={NavLink} to="/login" variant="default">
                    Entrar
                </Button>
            </InteractiveElement>

            <InteractiveElement smol>
                <Button component={NavLink} to="/cadastro">
                    Cadastrar
                </Button>
            </InteractiveElement>
        </Group>
    );

    return (
        <header className={classes.header}>
            <Container size="xl" style={{ display: "flex", width: "100%" }}>
                <Group justify="space-between" style={{ flex: 1 }}>
                    <Group>
                        <InteractiveElement smol>
                            <NavLink to="/">
                                <Image src={logo} alt="Veredas Logo" h={45} w={45} className={classes.logo} />
                            </NavLink>
                        </InteractiveElement>

                        <Group gap={5} visibleFrom="sm">
                            <InteractiveElement smol>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `${classes.link} ${isActive ? classes.linkActive : ""}`
                                    }
                                >
                                    Home
                                </NavLink>
                            </InteractiveElement>

                            <InteractiveElement smol>
                                <NavLink
                                    to="/sobre"
                                    className={({ isActive }) =>
                                        `${classes.link} ${isActive ? classes.linkActive : ""}`
                                    }
                                >
                                    Sobre Nós
                                </NavLink>
                            </InteractiveElement>
                        </Group>
                    </Group>

                    <Group>
                        <InteractiveElement smol>
                            <UnstyledButton
                                className={classes.searchButton}
                                onClick={() => spotlight.open()}
                                visibleFrom="sm"
                                aria-label="Buscar trilha"
                            >
                                <Group justify="space-between" align="center" w="100%">
                                    <Group gap="xs" align="center">
                                        <IconSearch size={18} stroke={1.5} />
                                        <Text size="sm">Buscar trilha...</Text>
                                    </Group>
                                    <Kbd>Ctrl + K</Kbd>
                                </Group>
                            </UnstyledButton>
                        </InteractiveElement>
                        <Group gap="xs" visibleFrom="sm">
                            {isAuthenticated ? userMenu : authButtons}
                        </Group>
                    </Group>

                    <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" size="sm" />
                </Group>
            </Container>

            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="100%"
                padding="md"
                title="Navegação"
                hiddenFrom="sm"
                zIndex={1000}
            >
                <Stack>
                    <Button
                        variant="default"
                        onClick={() => {
                            spotlight.open();
                            closeDrawer();
                        }}
                        leftSection={<IconSearch size={16} />}
                    >
                        Buscar trilha...
                    </Button>
                    <Divider my="sm" />
                    <Button
                        component={NavLink}
                        to="/"
                        variant="subtle"
                        fullWidth
                        onClick={closeDrawer}
                        leftSection={<IconHome size={16} />}
                    >
                        Home
                    </Button>
                    <Button
                        component={NavLink}
                        to="/sobre"
                        variant="subtle"
                        fullWidth
                        onClick={closeDrawer}
                        leftSection={<IconInfoCircle size={16} />}
                    >
                        Sobre Nós
                    </Button>
                    <Divider my="sm" />

                    {isAuthenticated ? (
                        <>
                            <Button
                                component={NavLink}
                                to="/perfil"
                                variant="subtle"
                                fullWidth
                                onClick={closeDrawer}
                                leftSection={<IconUser size={16} />}
                            >
                                Meu Perfil
                            </Button>
                            <Button
                                variant="subtle"
                                color="red"
                                fullWidth
                                onClick={() => {
                                    handleLogout();
                                    closeDrawer();
                                }}
                                leftSection={<IconLogout size={16} />}
                            >
                                Sair
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button component={NavLink} to="/login" variant="default" fullWidth onClick={closeDrawer}>
                                Entrar
                            </Button>
                            <Button component={NavLink} to="/cadastro" fullWidth onClick={closeDrawer}>
                                Cadastrar
                            </Button>
                        </>
                    )}
                </Stack>
            </Drawer>
        </header>
    );
};

export default Header;
