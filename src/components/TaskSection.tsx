import React from 'react';
import { Text } from 'react-native';
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
            <Text>{sectionTitle}</Text>
            {
                sectionArr.map((task) => (
                    <TaskItem removeTask={removeTask} toggleCompleted={toggleCompleted} task={task} key={task.key}/>
                ))
            }
        </>
    );
}