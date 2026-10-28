
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function Index() {
    const [nickname, setNickname] = useState('');

    const router = useRouter();

    function jogar() {
        if (nickname.trim() === '') {
            Alert.alert('Atenção', 'Digite seu nickname para jogar');
            return;
        }

        router.push({
            pathname: '/jogo',
            params: {
                nickname: nickname.trim()
            }
        });
    }

    function ranking() {
        router.push('/ranking');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Jogo de Adivinhação</Text>

            <Text style={styles.descricao}>
                Descubra o número entre 1 e 100!
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Digite seu nickname"
                value={nickname}
                onChangeText={setNickname}
                maxLength={20}
            />

            <Pressable style={styles.botao} onPress={jogar}>
                <Text style={styles.textoBotao}>Play</Text>
            </Pressable>

            <Pressable style={styles.botaoRanking} onPress={ranking}>
                <Text style={styles.textoBotao}>Ranking</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F5F5',
        padding: 20
    },
    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center'
    },
    descricao: {
        fontSize: 16,
        marginBottom: 30,
        textAlign: 'center'
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 8,
        padding: 15,
        fontSize: 16,
        backgroundColor: 'white',
        marginBottom: 20
    },
    botao: {
        backgroundColor: '#198754',
        padding: 15,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
        marginBottom: 10
    },
    botaoRanking: {
        backgroundColor: '#343A40',
        padding: 15,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center'
    },
    textoBotao: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    }
});
