import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconButton, Checkbox } from 'react-native-paper';
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
            <Text style={styles.taskName}>{task.taskName}</Text>
            <IconButton icon={'delete'} onPress={() => removeTask(task.key)}></IconButton>
        </View>
    )
}

const styles = StyleSheet.create({
    taskList: {
      paddingHorizontal: "2%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: 'center',
      marginVertical: 2,
    },
    taskName: {
        width: 1,
        flexGrow: 1,
    },
  });