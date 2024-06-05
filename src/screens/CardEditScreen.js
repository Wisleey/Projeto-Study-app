import { View, Text, TextInput, Button, StyleSheet } from "react-native";
// Importa os componentes básicos do React Native para criar a interface de usuário

import React, { useContext, useState, useEffect } from "react";
// Importa React e alguns hooks: useContext, useState, useEffect

import { Picker } from "@react-native-picker/picker";
// Importa o componente Picker para selecionar itens de uma lista

import StudyCardsContext from '../contexts/StudyCardsContext';
// Importa o contexto dos cartões de estudo

import DateTimePickerModal from 'react-native-modal-datetime-picker';
// Importa o componente modal para seleção de data e hora

const CardEditScreen = ({ route, navigation }) => {
    // Desestrutura as props route e navigation, passadas automaticamente pelo react-navigation

    const { id } = route.params || {};
    // Obtém o id dos parâmetros da rota, ou um objeto vazio se não houver parâmetros

    const { cards, addCard, updateCard } = useContext(StudyCardsContext);
    // Usa o contexto dos cartões de estudo para acessar os cartões e as funções de adicionar e atualizar cartões

    const card = cards.find(c => c.id === id) || {};
    // Encontra o cartão com o id fornecido ou um objeto vazio se não encontrar

    // Define estados locais para armazenar o título, notas, status, data de término e visibilidade do seletor de data
    const [title, setTitle] = useState(card.title || '');
    const [notes, setNotes] = useState(card.notes || '');
    const [status, setStatus] = useState(card.status || 'backlog');
    const [dueDate, setDueDate] = useState(card.dueDate ? new Date(card.dueDate) : new Date());
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);

    useEffect(() => {
        // Atualiza os estados locais se o id ou o cartão mudar
        if (id) {
            setTitle(card.title);
            setStatus(card.status);
            setNotes(card.notes);
            setDueDate(new Date(card.dueDate));
        }
    }, [id, card]);

    const handleSave = () => {
        // Cria um objeto com os dados do cartão para salvar
        const cardData = { title, notes, status, dueDate: dueDate.toISOString() };

        if (id) {
            // Atualiza o cartão se um id for fornecido
            updateCard(id, cardData);
        } else {
            // Adiciona um novo cartão se não houver id
            addCard(cardData);
        }

        navigation.goBack();
        // Navega de volta para a tela anterior
    };

    const showDatePicker = () => {
        // Mostra o seletor de data
        setDatePickerVisible(true);
    };

    const hideDatePicker = () => {
        // Esconde o seletor de data
        setDatePickerVisible(false);
    };

    const handleConfirm = (date) => {
        // Define a data de término e esconde o seletor de data
        setDueDate(date);
        hideDatePicker();
    };

    const formatDate = (date) => {
        // Formata a data para exibição
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    };

    return (
        // Estrutura a interface de edição do cartão
        <View style={styles.container}>
            <Text style={styles.label}>Título:</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Título do Card..."
            />
            <Text style={styles.label}>Notas:</Text>
            <TextInput
                style={styles.input}
                value={notes}
                onChangeText={setNotes}
                placeholder="Insira uma descrição..."
                multiline
            />
            <Text style={styles.label}>Data/Hora de Término:</Text>
            <Button title="Escolher Data" onPress={showDatePicker} color="#32cd32" />
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
            <Text style={styles.selectedDateLabel}>Data selecionada: {formatDate(dueDate)}</Text>

            <Text style={styles.label}>Status:</Text>
            <Picker
                selectedValue={status}
                style={styles.input}
                onValueChange={(itemValue, itemIndex) => setStatus(itemValue)}
            >
                <Picker.Item label="Backlog" value="backlog" />
                <Picker.Item label="Em Progresso" value="in_progress" />
                <Picker.Item label="Concluído" value="done" />
            </Picker>
            <Button title="Salvar" onPress={handleSave} color="#32cd32" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    selectedDateLabel: {
        fontSize: 16,
        marginBottom: 15,
        color: '#555555',
    },
    input: {
        fontSize: 14,
        borderWidth: 1,
        borderColor: '#cccccc',
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
        width: '100%',
    }
});

export default CardEditScreen;
// Exporta o componente CardEditScreen como padrão
