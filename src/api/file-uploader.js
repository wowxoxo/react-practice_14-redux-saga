export const uploadFile = ({ address, files, onProgress }) => {
  console.log(`Uploading ${files.length} file(s) to ${address} ...`);
  let progress = 0;
  const interval = setInterval(() => {
    progress++;
    onProgress(progress);
    if (progress === 100) {
      clearInterval(interval);
    }
  }, 20);
};
