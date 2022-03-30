import React from "react";
import Button from "react-bootstrap/Button";
import { ProgressBar } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { FILES_UPLOADING_START } from "./store/posts/actions";

const Uploader = () => {
  const dispatch = useDispatch();
  const filesUploadingProgress = useSelector(
    (state) => state.posts.filesUploadingProgress
  );
  const handleUploadClick = () => {
    dispatch({ type: FILES_UPLOADING_START });
  };

  return (
    <div>
      <Button onClick={handleUploadClick}>Upload files</Button>
      <p>Uploading progress: {filesUploadingProgress}</p>
      <ProgressBar
        animated
        now={filesUploadingProgress}
        label={`${filesUploadingProgress}%`}
      />
    </div>
  );
};

export default Uploader;
