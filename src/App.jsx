import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [dependencies, setDependencies] = useState([['', '']])
  const handleDependentChange = (e, index) => {
    dependencies[index][0] = e.target.value;
    setDependencies([...dependencies])
  }
  const handleDependencyChange = (e, index) => {
    dependencies[index][1] = e.target.value;
    setDependencies([...dependencies])
  }
  return (
    <>
      <div><span>tasks:</span></div>
      <div><input type="text" placeholder="英文逗号隔开(A,B)" value={tasks} onChange={(e) => setTasks(e.target.value)} /></div>
      <div><span>dependencies:</span></div>
      {dependencies.map(([dependent, dependency], index) => {
        return (<p key={index}>
          <input type="text" value={dependent} onChange={(e) => handleDependentChange(e, index)} />
          依赖
          <input type="text" value={dependency} onChange={(e) => handleDependencyChange(e, index)}/>
          <button onClick={()=>setDependencies([dependencies.toSpliced(index, 1)])}>删除</button>
        </p>)
      })}
      <button onClick={()=>setDependencies([...dependencies,['','']])}>添加依赖</button>
    </>
  )
}

export default App
