import React, { useState, useEffect, useRef, useMemo } from 'react';
import { TextInput, Button, View, Text, StyleSheet } from 'react-native';
import { TaskItem } from './TaskItem';
import { TaskSection } from './TaskSection';
import { Task, getTasks, setTasks } from '../api/tasks';
import { AnimatedFAB, Appbar } from 'react-native-paper';

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
            <Appbar.Header>
                <Appbar.Content title="React Native Todo" />
            </Appbar.Header>

            <TaskSection sectionTitle='Active' sectionArr={activeTasks} removeTask={removeTask} toggleCompleted={toggleCompleted} />
            <TaskSection sectionTitle='Completed' sectionArr={completedTasks} removeTask={removeTask} toggleCompleted={toggleCompleted} />

            <AnimatedFAB 
                icon={'plus'}
                label={'Add Task'}
                extended={true}
                style={styles.addTaskFab}
                animateFrom={'left'}
            />
        </>
    )
}

// <TextInput style={styles.bg} onChangeText={setTaskText} value={taskText}></TextInput>
// <Button title="Add Task" onPress={() => addTask(taskText)}></Button>

const styles = StyleSheet.create({
    bg: {
        backgroundColor: "lightblue",
    },
    addTaskFab: {
        position: 'absolute',
        bottom: 16,
        right: 16,
    }
});