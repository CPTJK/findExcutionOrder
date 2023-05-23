import { useState, useRef } from 'react'
import './App.css'
import findOrder from './findOrder';

function App() {
  const id = useRef(0);
  const [tasks, setTasks] = useState('')
  const [dependencies, setDependencies] = useState([{id:0, dependent:'', dependency:''}])
  const [result, setResult] = useState('')
  const handleDependentChange = (e, index) => {
    dependencies[index].dependent = e.target.value;
    setDependencies([...dependencies])
  }
  const handleDependencyChange = (e, index) => {
    dependencies[index].dependency = e.target.value;
    setDependencies([...dependencies])
  }
  const addDep = () => {
    id.current = id.current + 1;
    const newDep = {id: id.current, dependent:'', dependency: ''}
    setDependencies([...dependencies, newDep])
  }
  const dependenciesStr = () => {
    const arr =  dependencies.filter(item=>item.dependency && item.dependent).map(item => {
      return [item.dependent, item.dependency]
    })
    return JSON.stringify(arr)
  }
  const sort = () => {
    const _tasks = tasks.split(',');
    const _dependencies = dependencies.filter(item=>item.dependency && item.dependent).map(item => [item.dependent,item.dependency])
    setResult(findOrder(_tasks,_dependencies).join('->') || '任务无法排序')
  }
  return (
    <>
      <span>tasks:</span>
      <div><input type="text" placeholder="英文逗号隔开(A,B)" value={tasks} onChange={(e) => setTasks(e.target.value)} /></div>
      <span>dependencies:</span>
      {dependencies.map(({dependent, dependency, id}, index) => {
        return (<p key={id}>
          <input type="text" value={dependent} onChange={(e) => handleDependentChange(e, index)} />
          依赖
          <input type="text" value={dependency} onChange={(e) => handleDependencyChange(e, index)}/>
          <button onClick={()=>setDependencies(dependencies.toSpliced(index, 1))}>删除</button>
        </p>)
      })}
      <button onClick={addDep}>添加依赖</button>
      <p>{`findOrder(${JSON.stringify(tasks.split(','))},${dependenciesStr()})`}</p>
      <button onClick={sort}>排序</button>
      {result && <p>排序结果: {result}</p>}
    </>
  )
}

export default App
