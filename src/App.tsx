import { useState } from 'react';
import logoImg from './assets/logo.png';
import plusLogo from './assets/plus.svg';
import clipboard from './assets/clipboard.svg';

import { Checkbox } from './components/Checkbox';
import './styles.css';

type TaskProps = {
  id: number,
  name: string,
  checked: boolean,
}

function App() {
  const [taskName, setTaskName] = useState('');
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  const handleCheckboxChange = (id: number) => {
    const findTask = tasks.map(task => {
      if (task.id === id) {
        return {
          id: task.id,
          name: task.name,
          checked: !task.checked,
        }
      } else {
        return {
          id: task.id,
          name: task.name,
          checked: task.checked,
        }
      }
    });
    setTasks(findTask)
  };

  const handleAddTask = () => {
    if(taskName.trim() === '') return;

    const newTask = {
      id: tasks.length,
      name: taskName,
      checked: false,
    }
    setTasks(state => [...state, newTask]);
    setTaskName('');
  }

  const removeTask = (id: number) => {
    const newListTasks = tasks.filter(task => task.id != id)
    setTasks(newListTasks);
  }


  return (
    <>
      <header className="headerLogo">
        <picture>
          <img src={logoImg} alt="logo da aplicacao" />
        </picture>
      </header>

      <main className="contentMain">
        <div className="field">
          <input type="text" className="inputTodo" placeholder="Adicione uma nova tarefa" onChange={e => setTaskName(e.target.value)} value={taskName} />
          <button className="btnCreate" onClick={handleAddTask}>
            Criar
            <img src={plusLogo} alt="+" />
          </button>
        </div>

        <section className="todoSection">
          <div className="todos">
            <div className="createdTodo">
              <span className="textCreatedTodo">Tarefas criadas</span>
              <span className="numberCreatedTodo">{tasks.length}</span>
            </div>

            <div className="finishedTodo">
              <span className="textFinishedTodo">Tarefas concluidas</span>
              <span className="numberFinishedTodo">{tasks.filter(t => t.checked).length} de {tasks.length}</span>
            </div>
          </div>

          {tasks.length > 0 ? (
            <div className="tasks">
              {tasks.map((task, index) => (
                <Checkbox
                  key={index}
                  id={task.id}
                  checked={task.checked}
                  label={task.name}
                  onChange={() => handleCheckboxChange(task.id)}
                  handleRemoveTask={() => removeTask(task.id)}
                />
              ))}
            </div>
          ) : (
            <div className="tasksSection">
              <div className="emptyTasks">
                <img src={clipboard} alt="clipboard" />
                <p>Você ainda não tem tarefas cadastradas <br />
                  Crie tarefas e organize seus itens a fazer</p>
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  )
}

export default App
