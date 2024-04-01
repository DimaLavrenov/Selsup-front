import { useState } from 'react'
import s from './App.module.css'

type ParamsType = {
  id: number
  name: string
}

type ModelType = {
  paramValues: Array<ParamValuesType>
}

type ParamValuesType = {
  paramId: number
  value: string
}

type StateType = {
  params: Array<ParamsType>
  model: Array<ModelType>
}

function App() {

  let state = {
    params: [
      {
        id: 1,
        name: "Товар"
      },
      {
        id: 2,
        name: "Назначение"
      },
      {
        id: 3,
        name: "Длина"
      },
      {
        id: 4,
        name: 'Цвет'
      }
    ],
    model: [
      {
        paramValues: [
          {
            paramId: 1,
            value: "футболка"
          },
          {
            paramId: 2,
            value: "повседневное"
          },
          {
            paramId: 3,
            value: "макси"
          },
          {
            paramId: 4,
            value: 'красный'
          }
        ]
      }
    ]
  }

  const [tasks, setTasks] = useState(state)

  const randomId = Math.floor(Math.random() * (100 - 5 + 1) + 5)

  const addTask = ( num: number,param: string, valueParam: string) => {
    setTasks({
      params: [...tasks.params, { id: num, name: param }],
      model: [{ paramValues: [...tasks.model[0].paramValues, { paramId: num, value: valueParam }] }]
    })
  }

  return (
    <div className={s.App}>
      <Product state={tasks} addTask={addTask} setTasks={setTasks}/>
    </div>
  );
}

type ProductPropsType = {
  state: StateType
  setTasks: any
  addTask: (num: number, param: string, valueParam: string) => void
}

function Product(props: ProductPropsType) {

  const [param, setParam] = useState('')
  const [valueParam, setValueParam] = useState('')

  const [editId, setEditId] = useState<number>()
  const [editParam, setEditParam] = useState<string>('')
  const [editValueParam, setEditValueParam] = useState<string>('')

  const addTask = () => {
    let num = props.state.params.length + 1
    props.addTask(num, param, valueParam)
    setParam('')
    setValueParam('')
  }

  const editTask = (id: number, name: string, value: string) => {
    setEditParam(name)
    setEditValueParam(value)
    setEditId(id)
    console.log(editId)
  }

  const test = () => {
    if(editId){
      console.log(props.state.model[0].paramValues.length - 1)
      props.state.model[0].paramValues[editId - 1] = { paramId: editId, value: editValueParam }
      props.state.params[editId - 1] = { id: editId, name: editParam }
      setEditParam('')
      setEditValueParam('')
    }
  }

  return (
    <div>
      <div className={s.card} >
        <div>
          <input type="text" placeholder='Введите параметр' value={param} onChange={(e) => { setParam(e.currentTarget.value) }} />
          <input type="text" placeholder='Введите значение' value={valueParam} onChange={(e) => { setValueParam(e.currentTarget.value) }} />
          <button onClick={addTask} >Click</button>
        </div>
        <div>
          {props.state.params.map(param => {
            return (
              <div className={s.flex}>
                <div><b>{param.name}:</b></div>
                {

                  props.state.model.map(el => {
                    return (
                      <div>
                        <div>{el.paramValues.map(el => {
                          if (el.paramId == param.id) {
                            return (
                              <div className={s.property} >
                                <div> {el.value}</div>
                                <button onClick={() => { editTask( param.id ,param.name, el.value) }} >Изменить</button>
                              </div>
                            )
                          }
                        })}
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            )
          })}
        </div>
      </div>

      <div>
        Edit form
        <input type="text" placeholder='Введите параметр' value={editParam} onChange={(e) => setEditParam(e.currentTarget.value)} />
        <input type="text" placeholder='Введите значение ' value={editValueParam} onChange={(e) => setEditValueParam(e.currentTarget.value)} />
        <button onClick={test} >Submit</button>
      </div>

    </div>
  )
}

export default App;
