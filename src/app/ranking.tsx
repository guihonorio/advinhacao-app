
import { useRouter } from "expo-router";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { db } from "../../firebaseConfig";
import { Resultado } from "../types/Resultado";

export default function Ranking() {
    const [resultados, setResultados] = useState<Resultado[]>([]);
    const router = useRouter();

    useEffect(() => {
        consultar();
    }, []);

    async function consultar() {
        try {
            const consulta = query(
                collection(db, 'resultados'),
                orderBy('tentativas', 'asc')
            );

            const querySnapshot = await getDocs(consulta);

            const lista: Resultado[] = [];

            querySnapshot.docs.map((doc) => {
                lista.push({
                    id: doc.id,
                    ...doc.data()
                } as Resultado);
            });

            setResultados(lista);

        } catch (e) {
            Alert.alert('Erro', String(e));
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Ranking</Text>

            <FlatList
                style={styles.lista}
                data={resultados}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <View style={styles.item}>
                        <Text style={styles.nome}>
                            {index + 1}º - {item.nickname}
                        </Text>
                        <Text style={styles.tentativas}>
                            {item.tentativas} tentativas
                        </Text>
                    </View>
                )}
                ListEmptyComponent={
                    <Text style={styles.vazio}>
                        Nenhum resultado encontrado.
                    </Text>
                }
            />

            <Pressable style={styles.botao} onPress={consultar}>
                <Text style={styles.textoBotao}>Atualizar Ranking</Text>
            </Pressable>

            <Pressable
                style={styles.botaoVoltar}
                onPress={() => router.back()}
            >
                <Text style={styles.textoBotao}>Voltar</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F5F5F5'
    },
    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 25,
        marginTop: 30
    },
    lista: {
        flex: 1
    },
    item: {
        backgroundColor: 'white',
        padding: 18,
        borderRadius: 8,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#DDDDDD'
    },
    nome: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    tentativas: {
        fontSize: 16,
        color: '#555555',
        marginTop: 5
    },
    vazio: {
        textAlign: 'center',
        fontSize: 16,
        color: '#777777',
        marginTop: 30
    },
    botao: {
        backgroundColor: '#198754',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10
    },
    botaoVoltar: {
        backgroundColor: '#343A40',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 15
    },
    textoBotao: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    }
});
