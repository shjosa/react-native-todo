import React, { useState, useEffect, useRef, useMemo } from 'react';
import { TextInput, Button, View, Text, StyleSheet } from 'react-native';
import { TaskItem } from './TaskItem';
import { Task, getTasks, setTasks } from '../api/tasks';

export const TaskList = () => {
    const [taskArr, setTaskArr] = useState<Array<Task>>([]);
    const [taskText, setTaskText] = useState("");
    const id = useRef(0);

    const activeTasks = useMemo(() => taskArr.filter(task => !task.isCompleted), [taskArr]);
    const completedTasks = useMemo(() => taskArr.filter(task => task.isCompleted), [taskArr]);

    useEffect(() => {
        getTasks().then((newArr) => {
            let highestKey = 0;
            for (let i = 0; i < newArr.length; i++) {
                if (newArr[i].key > highestKey)
                    highestKey = newArr[i].key;
            }
            id.current = highestKey;
            setTaskArr(newArr);
        }).catch(console.error);
    }, []);

    function addTask(task: string) {
        const taskId = id.current + 1;
        const tempArr = [...taskArr, { key: taskId, taskName: task, isCompleted: false }];
        setTaskText("");
        setTaskArr(tempArr);
        id.current = taskId;
        setTasks(tempArr);
    }

    function removeTask(key: number) {
        const tempArr = [...taskArr];
        const pos = tempArr.findIndex(task => task.key === key);
        tempArr.splice(pos, 1);
        setTaskArr(tempArr);
        setTasks(tempArr);
    }

    function toggleCompleted(key: number) {
        const tempArr = [...taskArr];
        const pos = tempArr.findIndex(task => task.key === key);
        tempArr[pos].isCompleted = !tempArr[pos].isCompleted;
        setTaskArr(tempArr);
        setTasks(tempArr);
    }

    return (
        <>
            <TextInput style={styles.bg} onChangeText={setTaskText} value={taskText}></TextInput>
            <Button title="Add Task" onPress={() => addTask(taskText)}></Button>

            {
                taskArr.map((task) => (
                    <TaskItem removeTask={removeTask} toggleCompleted={toggleCompleted} task={task} key={task.key}/>
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