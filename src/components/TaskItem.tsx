import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { Task } from '../api/tasks';

type TaskItemProps = {
    removeTask: (key: number) => void,
    toggleCompleted: (key: number) => void,
    task: Task,
}

export const TaskItem = ({removeTask, toggleCompleted, task}: TaskItemProps) => {
    return (
        <View style={styles.taskList}>
            <Checkbox
                status={task.isCompleted ? 'checked' : 'unchecked'}
                onPress={() => toggleCompleted(task.key)}
            />
            <Text>{task.taskName}</Text>
            <Button title="Remove Task" onPress={() => removeTask(task.key)}></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    taskList: {
      paddingHorizontal: "2%",
      flexDirection: "row",
      justifyContent: "space-between",
    }
  });