import React, { useState, useRef, useEffect } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import { TaskList } from './components/TaskList';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [taskText, setTaskText] = useState("");

  return (
    <SafeAreaView >
      <TaskList />
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "red",
  },
  bg: {
    backgroundColor: "blue",
  },
  taskList: {
    paddingHorizontal: "2%",
    flexDirection: "row",
    justifyContent: "space-between",
  }
});

export default App;
