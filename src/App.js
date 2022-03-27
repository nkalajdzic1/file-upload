import { useState } from "react";
import styled from "styled-components";

import { Progress } from "Progress";
import { useUploadFile } from "useUploadFile";
import { useFiles } from "useFiles";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  margin: 0 auto;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 50%;
  gap: 20px;
`;

const StyledButton = styled.button`
  padding: 5px;
  background-color: transparent;
  outline: 0px;
  border: 2px solid black;
  width: 200px;
  cursor: pointer;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: fit-content;
  height: 400px;
  overflow-y: scroll;
  margin: 50px auto;
  padding: 20px;
`;

const FileDataWrapper = styled.div`
  border: 2px solid black;
  padding: 10px;
  width: 400px;
  margin: 0 auto;
`;

const FileDataItem = styled.div``;

const FileData = ({ file }) => (
  <FileDataWrapper>
    <FileDataItem>Id: {file.id}</FileDataItem>
    <FileDataItem>Type: {file.mimeType}</FileDataItem>
    <FileDataItem>Name: {file.name}</FileDataItem>
    <FileDataItem>Size: {file.size}</FileDataItem>
  </FileDataWrapper>
);

const App = () => {
  const [file, setFile] = useState();

  // hook for handeling file upload to backend
  const { progress, uploadAsync } = useUploadFile();

  // hook to retrieve files from the backend
  const {
    data: fileList,
    isLoading: isLoadingFileList,
    refetch: refetchFileList,
  } = useFiles();

  const onFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFile(file);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    // upload file
    await uploadAsync(file);

    // refetch the list again
    await refetchFileList();
  };

  return (
    <Wrapper>
      <StyledForm onSubmit={onSubmit}>
        <input type="file" onChange={onFileUpload} />
        <StyledButton type="submit">Upload file</StyledButton>
        <Progress style={{ marginTop: 20 }} progress={progress} />
      </StyledForm>
      {!isLoadingFileList && fileList?.length === 0 && (
        <div style={{ marginTop: 50, textAlign: "center" }}>
          No files uploaded yet
        </div>
      )}
      {!isLoadingFileList && fileList?.length !== 0 && (
        <ListWrapper>
          {fileList?.map((x, i) => (
            <FileData file={x} key={i} />
          ))}
        </ListWrapper>
      )}
      {isLoadingFileList && (
        <div style={{ marginTop: 50, textAlign: "center" }}>Loading...</div>
      )}
    </Wrapper>
  );
};

export default App;
