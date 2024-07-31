export const filterTasks = (tasks: any[], list: string | null) => {
  if (!list) {
    return tasks;
  }

  return tasks.filter((task) => {
    return task.list.includes(list);
  });
};
