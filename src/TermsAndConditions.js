import { useState, useEffect } from "react";
import { Modal, Text, Anchor, Box, Code } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import classes from "./TermsAndConditions.module.css";

const mainTermsText = `Termos de Uso Veredas 

Bom dia magnata. Ao clicar em "Cadastrar", você está basicamente fazendo um pacto digital conosco. E, como em todo bom pacto, existem regras. Ignorá-las não fará com que desapareçam (tentamos isso com os boletos, não funciona).

1. Uso da Conta: Você é responsável por manter sua senha em segredo. Se sua senha for "1234" ou "senha123", já merece ser hackeado mesmo. Caso sua conta seja invadida por um gato alien ou seu sobrinho de 5 anos, a culpa é exclusivamente sua.

2. Conduta do Usuário: É proibido usar o serviço para crimes ou invocar entidades de outro mundo. Também não é permitido tentar usar nosso sistema para pedir pizza (já tentaram). Qualquer tentativa de usar nosso sistema para pedir delivery será redirecionada automaticamente para o restaurante mais caro da cidade.

3. Propriedade Intelectual: Todo o conteúdo, incluindo textos, imagens e até os bugs (que preferimos chamar de “versões beta perpétuas”), pertence a nós. Ao se cadastrar, você também concorda em ceder todos os seus direitos humanos e poderá ser gentilmente transferido para um estágio vitalício numa fábrica da Shopee na China.

4. Limitação de Responsabilidade: Nós não nos responsabilizamos por danos físicos, emocionais ou espirituais. Inclusive, se você ler isso em voz alta e um demônio aparecer, é problema seu.

5. Direitos e Obrigações Extras: Ao se cadastrar, você concorda em vender sua alma, dois sonhos e talvez um pacote de bolacha recheada (marca a ser definida pelo sistema).

6. Alterações nos Termos: Podemos mudar estes termos quando quisermos, sem avisar. Inclusive, já mudamos enquanto você estava lendo esta frase, mas não vamos dizer onde.

Nossos termos seguem os critérios de transparência exigidos por lei.`;

// eslint-disable-next-line
const TermsAndConditionsOld = `Bem-vindo! Ao se cadastrar, você concorda com os seguintes termos e condições (mesmo que não tenha lido nada, porque ninguém nunca lê isso mesmo):

Uso da Conta: Você é responsável por manter sua senha em segredo. Se você usar "123456" ou "senha", já está errado. Caso sua conta seja invadida por um gato alien extra-terrestre, a culpa é exclusivamente sua.

Conduta do Usuário: É proibido usar o serviço para crimes ou invocar entidades de outro mundo. Também não é permitido tentar usar este site para pedir pizza (já tentaram).

Propriedade Intelectual: Todo o conteúdo, incluindo textos, imagens e até os bugs (que são praticamente parte da decoração), pertence ao dono do serviço. Ao se cadastrar, você também concorda em ceder todos os seus direitos humanos e poderá ser gentilmente transferido para um estágio vitalício numa fábrica da Shopee na China.

Limitação de Responsabilidade: O proprietário não se responsabiliza por danos físicos, emocionais ou espirituais. Inclusive, se você ler isso em voz alta e um demônio aparecer, é problema seu.

Direitos e Obrigações Extras: Ao se cadastrar, você concorda em vender sua alma, dois sonhos e talvez um pacote de bolacha recheada (marca a ser definida pelo sistema).

Alterações nos Termos: Podemos mudar estes termos quando quisermos, sem avisar. Inclusive, já mudamos enquanto você estava lendo esta frase.

Última atualização: 9 de Setembro de 2025 (ou daqui a 5 segundos, depende do humor do adm).`;

const generateInitialTime = () => {
    const now = Date.now();
    const fiveMinutesInMillis = 5 * 60 * 1000;
    const threeHoursInMillis = 3 * 60 * 60 * 1000;
    const randomMillisAgo = Math.random() * (threeHoursInMillis - fiveMinutesInMillis) + fiveMinutesInMillis;
    return new Date(now - randomMillisAgo);
};

const formatDateTime = (date) => {
    const options = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    };
    return date.toLocaleString("pt-BR", options);
};

const TermsAndConditions = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const isMobile = useMediaQuery("(max-width: 50em)");

    const [lastUpdated, setLastUpdated] = useState(new Date());

    useEffect(() => {
        if (opened) {
            setLastUpdated(generateInitialTime());

            const intervalId = setInterval(() => {
                if (Math.random() < 0.1) {
                    setLastUpdated(new Date());
                }
            }, 30000);

            return () => clearInterval(intervalId);
        }
    }, [opened]);

    const fullTermsText = `${mainTermsText}\n\nÚltima atualização: ${formatDateTime(lastUpdated)} (ou daqui a 5 segundos, depende do humor do adm).`;

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
                    {fullTermsText}
                </Code>
            </Modal>

            <Box mt="xs">
                {" "}
                <Text size="xs" c="dimmed" ta="center">
                    {" "}
                    Ao se cadastrar, você concorda com os{" "}
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
