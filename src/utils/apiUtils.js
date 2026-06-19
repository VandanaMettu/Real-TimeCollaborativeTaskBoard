export const fakeUpdateTaskStatus = (taskId, newStatus) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldFail = Math.random() < 0.1;

      if (shouldFail) {
        reject("Failed");
      } else {
        resolve({ taskId, newStatus });
      }
    }, 1000);
  });
};

export const fakeAddTask = (taskData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldFail = Math.random() < 0.1;

      if (shouldFail) {
        reject("Adding task failed");
      } else {
        const serverSavedTask = {
          ...taskData,
          id: new Date().toISOString(),
          createdAt: new Date().toISOString(),
        };
        resolve(serverSavedTask);
      }
    }, 1000);
  });
};

export const fakeEditTask = (taskId, updatedTask) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldFail = Math.random() < 0.1;

      if (shouldFail) {
        reject("Could not save modifications.");
      } else {
        resolve({ id: taskId, updatedTask });
      }
    }, 200);
  });
};
