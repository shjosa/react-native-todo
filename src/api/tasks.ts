import DefaultPreference from 'react-native-default-preference';

const LOCAL_STORAGE_KEY = 'taskList';

export type Task = {
    key: number,
    taskName: string,
    isCompleted: boolean,
}

export async function getTasks(): Promise<Array<Task>> {
    const str = await DefaultPreference.get(LOCAL_STORAGE_KEY);
    if (!str)
        return [];
    return JSON.parse(str);
}

export async function setTasks(tasks: Array<Task>) {
    await DefaultPreference.set(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
}
