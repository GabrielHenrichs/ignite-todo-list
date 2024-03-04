import styles from './Content.module.css';
import { Task, TaskType } from './Task';

interface ContentProps {
    tasks: TaskType[],
    onDeleteTask: (task: TaskType) => void,
    onCheckTask: (task: TaskType) => void,
    onUncheckTask: (task: TaskType) => void
}

export function Content({ tasks, onDeleteTask, onCheckTask, onUncheckTask }: ContentProps) {
    const numberOfTasks = tasks.length;
    const numberOfFinishedTasks = tasks.filter(task => task.done).length

    return (
        <section className={styles.content}>
            <div className={styles.header}>
                <div className={styles.info}>
                    <strong>Tarefas criadas</strong>
                    <div>{numberOfTasks}</div>
                </div>
                <div className={styles.info}>
                    <strong>Concluídas</strong>
                    <div>{numberOfFinishedTasks} de {numberOfTasks}</div>
                </div>
            </div>
            <div>
                {tasks.map(task => {
                    return (
                        <Task
                            key={task.id}
                            task={task}
                            onDeleteTask={onDeleteTask}
                            onCheckTask={onCheckTask}
                            onUncheckTask={onUncheckTask}
                        />
                    );
                })}
            </div>
        </section>
    );
}