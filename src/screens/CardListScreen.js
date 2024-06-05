import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from "react-native";
// Importa os componentes básicos do React Native para criar a interface de usuário

import React, { useContext } from "react";
// Importa React e o hook useContext

import StudyCardsContext from '../contexts/StudyCardsContext';
// Importa o contexto dos cartões de estudo

const CardListScreen = ({ navigation }) => {
    // Desestrutura a prop navigation, passada automaticamente pelo react-navigation

    const { cards, deleteCard } = useContext(StudyCardsContext);
    // Usa o contexto dos cartões de estudo para acessar os cartões e a função de deletar cartões

    // Filtra os cartões por status
    const inProgressCards = cards.filter(card => card.status === 'in_progress');
    const concludedCards = cards.filter(card => card.status === 'done');
    const backlogCards = cards.filter(card => card.status === 'backlog');

    const today = new Date();
    const dueSoonCards = cards.filter(card => {
        // Filtra os cartões que estão com vencimento próximo
        const dueDate = new Date(card.dueDate);
        const diffInDays = (dueDate - today) / (1000 * 60 * 60 * 24);
        return diffInDays >= 0 && diffInDays <= 15;
    });

    const renderCard = ({ item }) => (
        // Função para renderizar cada cartão
        <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text>Status: {item.status}</Text>
            <Text>Data/Hora de Término: {new Date(item.dueDate).toLocaleString()}</Text>
            <View>
                <Button title='Editar' onPress={() => navigation.navigate('CardEdit', { id: item.id })} />
                <Button title='Deletar' onPress={() => deleteCard(item.id)} color="#ff6347" />
            </View>
        </View> 
    );

    return (
        // Estrutura a interface da lista de cartões
        <View style={styles.container}>
            <TouchableOpacity style={styles.dueSoonButton} onPress={() => navigation.navigate('TasksDueSoon')}>
                <Text style={styles.dueSoonButtonText}>Tasks a Vencer: {dueSoonCards.length}</Text>
            </TouchableOpacity>
            <Text style={styles.sectionTitle}>Em Progresso</Text>
            <FlatList 
                data={inProgressCards}
                keyExtractor={item => item.id.toString()}
                renderItem={renderCard}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
            <View style={styles.divider} />
            <Text style={styles.sectionTitle}>Concluído</Text>
            <FlatList 
                data={concludedCards}
                keyExtractor={item => item.id.toString()}
                renderItem={renderCard}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
            <View style={styles.divider} />
            <Text style={styles.sectionTitle}>Backlog</Text>
            <FlatList 
                data={backlogCards}
                keyExtractor={item => item.id.toString()}
                renderItem={renderCard}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('CardEdit')}>
                <Text style={styles.addButtonText}>+ Adicionar Novo Card</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    // Define os estilos para os componentes
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f9f9f9',
    },
    dueSoonButton: {
        backgroundColor: '#ff4500',
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    dueSoonButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    suggestButton: {
        backgroundColor: '#4682b4',
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    suggestButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: '#ffffff',
        padding: 20,
        margin: 8,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
        minWidth: 200,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    addButton: {
        backgroundColor: '#4682b4',
        padding: 15,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    addButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    divider: {
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
        marginVertical: 10,
    }
});

export default CardListScreen;
// Exporta o componente CardListScreen como padrão
