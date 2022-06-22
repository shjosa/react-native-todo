import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

export type Task = {
    key: number,
    taskName: string,
    isCompleted: boolean,
}

type TaskItemProps = {
    removeTask: (key: number) => void,
    task: Task,
}

export const TaskItem = ({removeTask, task}: TaskItemProps) => {
    return (
        <View style={styles.taskList}>
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