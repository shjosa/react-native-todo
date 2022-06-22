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

type Task = {
  key: number,
  taskName:  string,
  isCompleted: boolean,
}

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [taskArr, setTaskArr] = useState<Array<Task>>([]);
  const [taskText, setTaskText] = useState("");
  const id = useRef(0);

  useEffect(() => {
    const newArr = taskArr;
    let highestKey = 0;
    for (let i = 0; i < newArr.length; i++) {
      if (newArr[i].key > highestKey)
        highestKey = newArr[i].key;
    }
    id.current = highestKey;
    setTaskArr(newArr);
  }, []);

  function addTask(task: string) {
    const taskId = id.current + 1;
    const tempArr = [...taskArr, { key: taskId, taskName: task, isCompleted: false }];
    setTaskArr(tempArr);
    id.current = taskId;
  }

  return (
    <SafeAreaView >
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <TextInput style={styles.bg} onChangeText={setTaskText} value={taskText}></TextInput>
      <Button title="Add Task" onPress={() => addTask(taskText)}></Button>

      {taskArr.map((task) => (
        <Text key={task.key}>{task.taskName}</Text>
      ))
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "red",
  },
  bg: {
    backgroundColor: "blue",
  }
});

export default App;
