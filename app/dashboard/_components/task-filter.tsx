export const filterTasks = (
  tasks: any[],
  tag: string | null,
  status: string | null
) => {
  if (!tag && !status) {
    return tasks;
  }

  return tasks.filter((task) => {
    return (!tag || task.tag === tag) && (!status || task.status === status);
  });
};
