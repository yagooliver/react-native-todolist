import * as React from 'react';
import {Provider} from 'react-redux';
import configStore from './lib/Store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TypeListConnect from './pages/types/TypeListConnect';
import TodoListConnect from './pages/todoList/TodoListConnect';

const Stack = createStackNavigator();

const config = configStore();
export default function App() {
  return (
    <Provider store={config}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="TypeList">
          <Stack.Screen name="TypeList" component={TypeListConnect} />
          <Stack.Screen name="TodoList" component={TodoListConnect} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}