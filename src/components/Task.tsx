import { useState } from "react";
import { Check, Trash } from "phosphor-react";

import styles from "./Task.module.css";

export interface TaskType {
    id: number;
    content: string;
    done: boolean;
}

interface TaskProps {
    task: TaskType;
    onDeleteTask: (task: TaskType) => void;
    onCheckTask: (task: TaskType) => void;
    onUncheckTask: (task: TaskType) => void;
}

export function Task({ task, onDeleteTask, onCheckTask, onUncheckTask }: TaskProps) {
    function handleCheckTask() {
        if (task.done)
            onUncheckTask(task)
        else
            onCheckTask(task)
    }

    function handleDeleteTask() {
        onDeleteTask(task);
    }

    return (
        <div className={styles.task}>
            <div className={styles.radio}>
                <div className={task.done ? styles.check : styles.uncheck} onClick={handleCheckTask}>
                    {task.done && <Check size={14} />}
                </div>
            </div>
            <div className={styles.content}>
                <span className={task.done ? styles.contentCheck : ''}>{task.content}</span>
            </div>
            <button type="button" onClick={handleDeleteTask}>
                <Trash size={20} />
            </button>
        </div>
    );
}