export const fakeUpdateTaskStatus = (taskId, newStatus) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldFail = Math.random() < 0.1;

      if (shouldFail) {
        reject("Failed");
      } else {
        resolve({ taskId, newStatus });
      }
    }, 2000);
  });
};
``;
