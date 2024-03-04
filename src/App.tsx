import { Header } from './components/Header';

import './global.css';
import styles from './App.module.css';
import { PlusCircle } from 'phosphor-react';
import { Content } from './components/Content';
import { TaskType } from './components/Task';
import { ChangeEvent, FormEvent, useState } from 'react';

const data: TaskType[] = [
  {
    id: 1,
    content: "Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.",
    done: false
  },
  {
    id: 2,
    content: "Fazer compras",
    done: true
  }
]

function App() {
  const [tasks, setTasks] = useState<TaskType[]>(data || []);
  const [newTaskContent, setNewTaskContent] = useState("")

  function handleCreateNewTaskContent(event: FormEvent) {
    event.preventDefault();

    const payload = {
      id: 1,
      content: newTaskContent,
      done: false
    }

    setTasks(state => {
      if (state.length > 0) {
        const ids = state.map(item => item.id);
        payload.id = Math.max(...ids) + 1;
        console.log(payload);
      }
      return [...state, payload]
    });
    setNewTaskContent('');
  }

  function handleNewTaskContentChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('');
    setNewTaskContent(event.target.value);
  }

  function handleNewTaskContentInvalid(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("Campo obrigatório");
  }

  function deleteTask(task: TaskType) {
    setTasks(state => state.filter(item => item.id !== task.id));
  }

  function checkTask(task: TaskType) {
    setTasks(state => state.map(item => {
      if (item.id !== task.id) return item;
      item.done = true;
      return item;
    }));
  }

  function uncheckTask(task: TaskType) {
    setTasks(state => state.map(item => {
      if (item.id !== task.id) return item;
      item.done = false;
      return item;
    }));
  }

  const isNewTaskContentEmpty = newTaskContent.length === 0;

  return (
    <div>
      <Header />
      <div className={styles.wraper}>
        <form onSubmit={handleCreateNewTaskContent}>
          <input
            placeholder='Adicione uma nova tarefa'
            value={newTaskContent}
            onChange={handleNewTaskContentChange}
            onInvalid={handleNewTaskContentInvalid}
          />
          <button type="submit" disabled={isNewTaskContentEmpty}>
            Criar
            <PlusCircle size={16} />
          </button>
        </form>
        <Content
          tasks={tasks}
          onDeleteTask={deleteTask}
          onCheckTask={checkTask}
          onUncheckTask={uncheckTask}
        />
      </div>
    </div>
  )
}

export default App
