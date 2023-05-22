import readline from "readline";

function findOrder (tasks, dependencies){
  const incomingEdges = new Map(), outgoingEdges = new Map();
  tasks.forEach((task) => {
    incomingEdges.set(task, new Set());
    outgoingEdges.set(task, new Set());
  })
  for (const [dependent, dependency] of dependencies) { // dependency -> dependent
    incomingEdges.get(dependent).add(dependency);
    outgoingEdges.get(dependency).add(dependent);
  }
  const queue = [];
  for (const [task, dependencySet] of incomingEdges.entries()) {
    if (dependencySet.size === 0) { // 入度为0
      queue.push(task);
    }
  }
  const orderedTasks = [];
  while(queue.length > 0) {
    const task = queue.shift();
    orderedTasks.push(task);
    for (const dependent of outgoingEdges.get(task)) {
      incomingEdges.get(dependent).delete(task);
      if (incomingEdges.get(dependent).size === 0) {
        queue.push(dependent);
      }
    }
  }
  if (orderedTasks.length === tasks.length) {
    return orderedTasks;
  }else{
    console.log('任务无法排序')
  }
}

let tasks, dependencies;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('tasks:', _tasks => {
  console.log(`tasks: ${_tasks}`);
  tasks = _tasks.split(',');
  rl.question('dependencies:', _dependencies => {
    console.log(`dependencies: ${_dependencies}`);
    dependencies = JSON.parse(_dependencies)
    console.log(findOrder(tasks, dependencies));
    rl.close();
  })
  
});

// console.log(tasks, dependencies);
// const res = findOrder(['A','B','C'],[['B','A'],['C','A'],['B','C']]);
// console.log(res);