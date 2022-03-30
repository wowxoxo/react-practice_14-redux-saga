import { channel } from "redux-saga";
import { call, fork, put, take } from "redux-saga/effects";
import { uploadFile } from "../api/file-uploader";
import {
  FILES_UPLOADING_PROGRESS,
  FILES_UPLOADING_START
} from "./posts/actions";

const handleProgress = (fileUploadingChannel, progressValue) => {
  fileUploadingChannel.put({ value: progressValue });
};

function* handleFileUploadingChannelEvents(fileUploadingChannel) {
  while (true) {
    const payload = yield take(fileUploadingChannel);
    yield put({
      type: FILES_UPLOADING_PROGRESS,
      payload: { progressValue: payload.value }
    });
  }
}

export function* filesUploadingChannelSaga() {
  const fileUploadingChannel = yield call(channel);

  yield fork(handleFileUploadingChannelEvents, fileUploadingChannel);

  while (true) {
    yield take(FILES_UPLOADING_START);

    yield fork(uploadFile, {
      address: "http://myserver.com",
      files: ["file1", "file2"],
      onProgress: (progressValue) =>
        handleProgress(fileUploadingChannel, progressValue)
    });
  }
}
