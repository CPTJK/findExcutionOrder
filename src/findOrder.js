function findOrder(tasks, dependencies) {
  // 总体思路: 有向无环图(DAG)拓扑排序
  // ->incomingEdges(进入的边)   outgoingEdges-> (出去的边)
  const incomingEdges = new Map(), outgoingEdges = new Map();
  // 初始化
  tasks.forEach((task) => {
    incomingEdges.set(task, new Set());
    outgoingEdges.set(task, new Set());
  })
  // 构建有向图
  for (const [dependent, dependency] of dependencies) {
    // dependency(被依赖者) -> dependent(依赖于他人的)
    incomingEdges.get(dependent).add(dependency);
    outgoingEdges.get(dependency).add(dependent);
  }
  const queue = []; //队列,先进先出
  for (const [task, dependencySet] of incomingEdges.entries()) {
    if (dependencySet.size === 0) { // 入度为 0
      queue.push(task);
    }
  }
  const orderedTasks = [];
  while (queue.length > 0) {
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
  } else { // 有向图里面有环, 无法排序
    console.log('任务无法排序')
    return [];
  }
}
export default findOrder;
// test
// console.log(findOrder(['A', 'B', 'C'], [['B', 'A'], ['C', 'A'], ['B', 'C']]));
// console.log(findOrder(['A', 'B', 'C', 'D'], [['B', 'A'], ['C', 'A'], ['B', 'C'], ['A', 'D']]));
// console.log(findOrder(['A', 'B', 'C', 'D'], [['B', 'A'], ['C', 'A'], ['B', 'C'], ['A', 'D'], ['D', 'B']]));