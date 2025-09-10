import { Modal, Text, Anchor, Box, Code } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import classes from "./TermsAndConditions.module.css";

const termsAndConditionsText = `Bem-vindo! Ao se registrar, você concorda com os seguintes termos e condições (mesmo que não tenha lido nada, porque ninguém nunca lê isso mesmo):

1. Uso da Conta: Você é responsável por manter sua senha em segredo. Se você usar "123456" ou "senha", já está errado. Caso sua conta seja invadida por um gato alien extra-terrestre, a culpa é exclusivamente sua.

2. Conduta do Usuário: É proibido usar o serviço para crimes ou invocar entidades de outro mundo. Também não é permitido tentar usar este site para pedir pizza (já tentaram).

3. Propriedade Intelectual: Todo o conteúdo, incluindo textos, imagens e até os bugs (que são praticamente parte da decoração), pertence ao dono do serviço. Ao se registrar, você também concorda em ceder todos os seus direitos humanos e poderá ser gentilmente transferido para um estágio vitalício numa fábrica da Shopee na China.

4. Limitação de Responsabilidade: O proprietário não se responsabiliza por danos físicos, emocionais ou espirituais. Inclusive, se você ler isso em voz alta e um demônio aparecer, é problema seu.

5. Direitos e Obrigações Extras: Ao se registrar, você concorda em vender sua alma, dois sonhos e talvez um pacote de bolacha recheada (marca a ser definida pelo sistema).

6. Alterações nos Termos: Podemos mudar estes termos quando quisermos, sem avisar. Inclusive, já mudamos enquanto você estava lendo esta frase.

Última atualização: 9 de Setembro de 2025 (ou daqui a 5 segundos, depende do humor do adm).`;

const TermsAndConditions = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const isMobile = useMediaQuery("(max-width: 50em)");

    return (
        <>
            <Modal
                opened={opened}
                onClose={close}
                title="Termos e Condições"
                fullScreen={isMobile}
                size="lg"
                radius="md"
                lockScroll={false}
            >
                <Code block className={classes.termsBox}>
                    {termsAndConditionsText}
                </Code>
            </Modal>

            <Box mt="xs">
                {" "}
                <Text size="xs" c="dimmed" ta="center">
                    {" "}
                    Ao se registrar, você concorda com os{" "}
                    <Anchor component="button" type="button" onClick={open}>
                        termos e condições
                    </Anchor>
                    .
                </Text>
            </Box>
        </>
    );
};

export default TermsAndConditions;
