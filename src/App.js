import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import AddTask from './components/AddTask';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Tasks from "./components/Tasks";
import About from "./components/About";

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await getTasksFromDB()
      setTasks(tasksFromServer)
    }

    getTasks()

  }, [])

  // FETCH TASKS FROM DB
  const getTasksFromDB = async () => {
    const url = 'http://localhost:3004/tasks'
    const res = await fetch(url)
    const data = await res.json()

    return data
  }

  // FETCH SINGLE TASK
  const getTaskFromDB = async (id) => {
    const url = 'http://localhost:3004/tasks/' + id
    const res = await fetch(url)
    const data = await res.json()

    return data
  }

  // ADD TASK TO STATE && DB
  const onAdd = async (task) => {
    const url = 'http://localhost:3004/tasks'
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'Application/json',
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()

    setTasks([...tasks, data])
  }

  // DELETE TASK
  const onDelete = async (id) => {
    const url = 'http://localhost:3004/tasks/' + id
    const res = await fetch(url, {
      method: 'DELETE'
    })

    const data = await res.json()
    setTasks(tasks.filter(el => el.id != id))
  }

  // MARK AS REMINDER
  const onToggle = async (id) => {
    const task = await getTaskFromDB(id)
    const updatedTask = { ...task, reminder: !task.reminder }
    const res = await fetch('http://localhost:3004/tasks/' + id, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })

    const data = await res.json()

    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    )
  }

  return (
    <Router>
      <div className="container">
        <Header
          onAdd={() => {
            setShowAddTask(!showAddTask)
          }
          }
          showAdd={showAddTask}
        />
        <Route
          exact
          path='/'
          render={(props) => (
            <>
              {showAddTask && <AddTask onAdd={onAdd} />}
              {tasks.length > 0 ?
                <Tasks
                  tasks={tasks}
                  onDelete={onDelete}
                  onToggle={onToggle}
                /> :
                'No tasks to show dude!'}
            </>
          )}
        />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
