import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Card } from 'react-native-paper';
import { Task } from '../api/tasks';
import { TaskItem } from './TaskItem';

type TaskSectionProps = {
    sectionTitle: string
    sectionArr: Array<Task>
    removeTask: (key: number) => void,
    toggleCompleted: (key: number) => void,
}

export const TaskSection = ({ sectionTitle, sectionArr, removeTask, toggleCompleted }: TaskSectionProps) => {
    if(!sectionArr.length)
        return null;
    return (
        <>
            <Card mode='outlined'>
                <Card.Title title={sectionTitle} />
                <Card.Content>
                    {
                        sectionArr.map((task) => (
                            <TaskItem removeTask={removeTask} toggleCompleted={toggleCompleted} task={task} key={task.key}/>
                        ))
                    }
                </Card.Content>
            </Card>
        </>
    );
}