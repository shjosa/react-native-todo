import React, { useState, useEffect, useRef } from 'react';
import { TextInput, Button, View, Text, StyleSheet } from 'react-native';
import { Task, TaskItem } from './Task';

export const TaskList = () => {
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

    function removeTask(key: number) {
        const tempArr = [...taskArr];
        const pos = tempArr.findIndex(task => task.key === key);
        tempArr.splice(pos, 1);
        setTaskArr(tempArr);
    }

    return (
        <>
            <TextInput style={styles.bg} onChangeText={setTaskText} value={taskText}></TextInput>
            <Button title="Add Task" onPress={() => addTask(taskText)}></Button>

            {
                taskArr.map((task) => (
                    <TaskItem removeTask={removeTask} task={task}/>
                ))
            }
        </>
    )
}

const styles = StyleSheet.create({
    bg: {
      backgroundColor: "lightblue",
    },
  });