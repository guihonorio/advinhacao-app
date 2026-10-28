
import { useLocalSearchParams, useRouter } from "expo-router";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import {
    Alert,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";
import { db } from "../../firebaseConfig";

export default function Jogo() {
    const router = useRouter();
    const { nickname } = useLocalSearchParams<{ nickname: string }>();

    const [numero, setNumero] = useState(
        Math.floor(Math.random() * 100) + 1
    );
    const [palpite, setPalpite] = useState('');
    const [tentativas, setTentativas] = useState(0);
    const [dica, setDica] = useState('');
    const [corDica, setCorDica] = useState('green');
    const [venceu, setVenceu] = useState(false);

    async function validar() {
        const valor = Number(palpite);

        if (
            palpite.trim() === '' ||
            !Number.isInteger(valor) ||
            valor < 1 ||
            valor > 100
        ) {
            Alert.alert('Atenção', 'Digite um número inteiro entre 1 e 100');
            return;
        }

        if (venceu) {
            return;
        }

        const totalTentativas = tentativas + 1;
        setTentativas(totalTentativas);

        if (valor < numero) {
            setDica('O número secreto é MAIOR!');
            setCorDica('#198754');
        } else if (valor > numero) {
            setDica('O número secreto é MENOR!');
            setCorDica('#DC3545');
        } else {
            setDica('Parabéns! Você acertou!');
            setCorDica('#198754');
            setVenceu(true);

            try {
                const resultado = {
                    nickname: nickname,
                    tentativas: totalTentativas
                };

                await addDoc(collection(db, 'resultados'), resultado);

                Alert.alert(
                    'Parabéns!',
                    `Você acertou em ${totalTentativas} tentativas!`
                );
            } catch (e) {
                Alert.alert('Erro ao salvar resultado', String(e));
            }
        }

        setPalpite('');
    }

    function jogarNovamente() {
        setNumero(Math.floor(Math.random() * 100) + 1);
        setPalpite('');
        setTentativas(0);
        setDica('');
        setCorDica('#198754');
        setVenceu(false);
    }

    return (
        <View style={styles.container}>
            <View style={styles.conteudo}>
                <View style={styles.cabecalho}>
                    <Text style={styles.icone}>🎯</Text>

                    <Text style={styles.titulo}>
                        Adivinhe o número
                    </Text>

                    <Text style={styles.jogador}>
                        Olá, {nickname}!
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.descricao}>
                        Escolhi um número entre 1 e 100.
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Digite seu palpite"
                        keyboardType="numeric"
                        value={palpite}
                        onChangeText={setPalpite}
                        editable={!venceu}
                    />

                    {!venceu ? (
                        <Pressable
                            style={styles.botaoValidar}
                            onPress={validar}
                        >
                            <Text style={styles.textoBotao}>
                                Validar palpite
                            </Text>
                        </Pressable>
                    ) : (
                        <Pressable
                            style={styles.botaoValidar}
                            onPress={jogarNovamente}
                        >
                            <Text style={styles.textoBotao}>
                                Jogar novamente
                            </Text>
                        </Pressable>
                    )}

                    {dica !== '' && (
                        <Text style={[styles.dica, { color: corDica }]}>
                            {dica}
                        </Text>
                    )}
                </View>

                <View style={styles.cardTentativas}>
                    <Text style={styles.labelTentativas}>
                        TENTATIVAS
                    </Text>

                    <Text style={styles.numeroTentativas}>
                        {tentativas}
                    </Text>
                </View>

                <Pressable
                    style={styles.botaoRanking}
                    onPress={() => router.push('/ranking')}
                >
                    <Text style={styles.textoBotao}>
                        Ver Ranking
                    </Text>
                </Pressable>

                <Pressable
                    style={styles.botaoVoltar}
                    onPress={() => router.replace('/')}
                >
                    <Text style={styles.textoVoltar}>
                        Voltar ao início
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
        justifyContent: 'center',
        padding: 20
    },
    conteudo: {
        width: '100%'
    },
    cabecalho: {
        alignItems: 'center',
        marginBottom: 25
    },
    icone: {
        fontSize: 42,
        marginBottom: 12
    },
    titulo: {
        fontSize: 27,
        fontWeight: 'bold',
        color: '#17212B',
        textAlign: 'center'
    },
    jogador: {
        fontSize: 16,
        color: '#64748B',
        marginTop: 10
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        padding: 18,
        marginBottom: 15
    },
    descricao: {
        fontSize: 16,
        color: '#475569',
        textAlign: 'center',
        marginBottom: 20
    },
    input: {
        backgroundColor: '#F8FAFC',
        borderWidth: 1,
        borderColor: '#CBD5E1',
        borderRadius: 10,
        padding: 15,
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 15
    },
    botaoValidar: {
        backgroundColor: '#198754',
        padding: 17,
        borderRadius: 10,
        alignItems: 'center'
    },
    textoBotao: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: 'bold'
    },
    dica: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 18
    },
    cardTentativas: {
        backgroundColor: '#E7F4EC',
        padding: 18,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 20
    },
    labelTentativas: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#64748B'
    },
    numeroTentativas: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#17663D',
        marginTop: 5
    },
    botaoRanking: {
        backgroundColor: '#343A40',
        padding: 17,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 12
    },
    botaoVoltar: {
        padding: 12,
        alignItems: 'center'
    },
    textoVoltar: {
        fontSize: 16,
        color: '#64748B'
    }
});
