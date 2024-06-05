import React, { createContext, useState, useEffect } from "react";
// Importa o React e alguns hooks: createContext, useState, useEffect

import AsyncStorage from "@react-native-async-storage/async-storage";
// Importa o AsyncStorage para armazenamento assíncrono de dados no dispositivo

const StudyCardsContext = createContext();
// Cria o contexto para os cartões de estudo

export const StudyCardsProvider = ({ children }) => {
    // Componente provedor que envolverá a aplicação ou parte dela

    const [cards, setCards] = useState([]);
    // Declara o estado 'cards' e a função 'setCards' para atualizá-lo, inicialmente como uma lista vazia

    useEffect(() => {
        loadCards();
    }, []);
    // useEffect executa a função loadCards ao montar o componente

    const loadCards = async () => {
        // Função assíncrona para carregar os cartões do armazenamento
        const storedCards = await AsyncStorage.getItem('cards');
        // Recupera os cartões armazenados com a chave 'cards'

        if (storedCards) setCards(JSON.parse(storedCards));
        // Se existirem cartões armazenados, atualiza o estado 'cards' com os dados recuperados
    };

    const addCard = async (card) => {
        // Função assíncrona para adicionar um novo cartão
        const newCards = [...cards, { ...card, id: Date.now() }];
        // Cria uma nova lista de cartões incluindo o novo cartão com um ID único baseado no timestamp atual

        setCards(newCards);
        // Atualiza o estado 'cards' com a nova lista

        await AsyncStorage.setItem('cards', JSON.stringify(newCards));
        // Armazena a nova lista de cartões no AsyncStorage
    };

    const updateCard = async (id, updates) => {
        // Função assíncrona para atualizar um cartão existente
        const newCards = cards.map(card => card.id === id ? { ...card, ...updates } : card);
        // Cria uma nova lista de cartões onde o cartão correspondente ao ID é atualizado

        setCards(newCards);
        // Atualiza o estado 'cards' com a lista atualizada

        await AsyncStorage.setItem('cards', JSON.stringify(newCards));
        // Armazena a lista atualizada de cartões no AsyncStorage
    };

    const deleteCard = async (id) => {
        // Função assíncrona para deletar um cartão
        const newCards = cards.filter(card => card.id !== id);
        // Cria uma nova lista de cartões excluindo o cartão com o ID especificado

        setCards(newCards);
        // Atualiza o estado 'cards' com a lista filtrada

        await AsyncStorage.setItem('cards', JSON.stringify(newCards));
        // Armazena a lista filtrada de cartões no AsyncStorage
    };

    return (
        <StudyCardsContext.Provider value={{ cards, addCard, updateCard, deleteCard }}>
            {/* Fornece o contexto para os componentes filhos */}
            {children}
        </StudyCardsContext.Provider>
    );
};

export default StudyCardsContext;
// Exporta o contexto dos cartões de estudo
