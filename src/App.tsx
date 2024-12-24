import { useState } from "react"
import Envelope from "./assets/svg";

type Task = {
  job: string;
  price: number;
}

type ServicesProps = {
  servicesArr: Task[];
  onTaskSelect: (task: Task) => void;
}

function App() {

  const servicesArr: Task[] = [
    {
      job: "Wash Car",
      price: 10
    },
    {
      job: "Mow Lawn",
      price: 20
    },
    {
      job: "Pull Weeds",
      price: 30
    }
  ]

  const [selectedTasks, setSelectedTasks] = useState<Task[]>([])
  const [total, setTotal] = useState(0)

  const handleTaskSelection = (task: Task) => {
    if (!selectedTasks.some((t: Task) => t.job === task.job)){
      setSelectedTasks(prevTasks => [...prevTasks, task])
      setTotal(prevTotal => prevTotal + task.price)
    } else {
      setSelectedTasks(prevTasks => prevTasks.filter(t => t.job !== task.job))
      setTotal(prevTotal => prevTotal - task.price)
    }
  }

  const Services = () => {
    return (
      <div className="task-btns">
        {servicesArr.map((service, index) => (
            <button className="task-btn" onClick={() => handleTaskSelection(service)} key={index}>
              {service.job}: ${service.price}
            </button>
        ))}
      </div>
    )
  }

  const ChargedTasks = () => {
    return(
      <div className="tasks">
        {selectedTasks.map((task, index) => (
          <div className="task" key={index}>
            <div className="title-btn-container">
              <div className="task-title">{task.job}</div>
              <button className="rmv-btn" onClick={() => handleTaskSelection(task)}>Remove</button>
            </div>
            <div>${task.price}</div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <>
      <div className="header">
        <div className="header-text">
          <h1>Invoice Creator</h1>
          <h2>Thanks for choosing GoodCorp, LLC!</h2>
        </div>
      </div>
      <div className="body">
        <Services />
        <div className="body-text">
          <p>TASK</p>
          <p>TOTAL</p>
        </div>
        <ChargedTasks />
        <div className="body-text">
          <p>NOTES</p>
          <p>TOTAL AMOUNT</p>
        </div>
        {total <= 0 ?  (
            <div className="body-text">
              <div></div>
              <div className="init-total">$0</div>
            </div>
          ) : (
            <div className="body-text">
              <p className="note-text">We accept cash, credit card, or PayPal</p>
              <div className="total">${total}</div>
            </div>
          )
        }
        <button onClick={() => window.location.reload()} className="invoice-btn"><Envelope /> Send Invoice</button>
      </div>
    </>
  )
}

export default App
