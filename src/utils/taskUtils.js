export const filterTasks = (tasks, filters) => {
  const hasFilters = filters.assignee || filters.priority || filters.search;

  if (!hasFilters) return tasks;

  const search = filters.search?.toLowerCase();

  return tasks.filter((task) => {
    return (
      (!search ||
        task.title.toLowerCase().includes(search) ||
        task.description.toLowerCase().includes(search)) &&
      (!filters.assignee || task.assignee === filters.assignee) &&
      (!filters.priority || task.priority === filters.priority)
    );
  });
};

export const groupTasksByStatus = (tasks) => {
  return tasks.reduce((acc, task) => {
    if (!acc[task.status]) acc[task.status] = [];
    acc[task.status].push(task);
    return acc;
  }, {});
};
