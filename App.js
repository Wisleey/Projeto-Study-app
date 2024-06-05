import React from "react";
// Importa a biblioteca React

import { NavigationContainer } from "@react-navigation/native";
// Importa o NavigationContainer da biblioteca de navegação do React Native

import { createStackNavigator } from "@react-navigation/stack";
// Importa a função para criar um stack navigator

import { StudyCardsProvider } from './src/contexts/StudyCardsContext';
// Importa o provedor de contexto dos cartões de estudo

import CardListScreen from './src/screens/CardListScreen';
// Importa o componente da tela de lista de cartões

import CardEditScreen from './src/screens/CardEditScreen';
// Importa o componente da tela de edição de cartões

import TasksDueSoonScreen from './src/screens/TasksDueSoonScreen';
// Importa o componente da tela de tarefas a vencer

const Stack = createStackNavigator();
// Cria o stack navigator

const App = () => {
    return (
        // O componente StudyCardsProvider envolve o aplicativo para fornecer o contexto dos cartões de estudo
        <StudyCardsProvider> 
            {/* NavigationContainer é o contêiner principal que gerencia o estado da navegação da aplicação */}
            <NavigationContainer>
                {/* Stack.Navigator é o componente que define a navegação de pilha */}
                <Stack.Navigator initialRouteName="CardList">
                    {/* Stack.Screen define uma tela na navegação de pilha */}
                    {/* name é o identificador da rota e component é o componente renderizado */}
                    {/* options define as opções para a tela, como o título */}
                    <Stack.Screen name="CardList" component={CardListScreen} options={{ title: 'Study Cards' }} />
                    <Stack.Screen name="CardEdit" component={CardEditScreen} options={{ title: 'Editar Card' }} />
                    <Stack.Screen name="TasksDueSoon" component={TasksDueSoonScreen} options={{ title: 'Tasks a Vencer' }} />
                </Stack.Navigator>
            </NavigationContainer>
        </StudyCardsProvider>
    );
};

export default App;
// Exporta o componente App como o componente padrão