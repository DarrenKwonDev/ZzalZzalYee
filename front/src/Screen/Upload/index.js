import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { loadingScreen, loadingScreenOff } from "../../reducers/global";
import { openNotification } from "../../utils";

const DropZone = styled.div`
  width: 30%;
  height: 250px;
  border: 2px solid #757575;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media all and (max-width: 767px) {
    width: 100%;
  }
`;

const JoinUs = styled.button`
  border: none;
  border-radius: 2px;
  margin: 1em 0 0 0;
  height: 2em;

  background-color: transparent;
  font-weight: bold;
  color: #3498db;
  border: 2px solid #3498db;
  cursor: pointer;
  &:hover {
    background-color: #3498db;
    color: white;
    transition: background-color 0.2s ease-in-out;
  }
  a:hover {
    color: white;
  }
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  margin-bottom: 1em;
  border-bottom: 1.5px solid black;
  font-size: 1.5em;
  &:focus {
    background-color: #dfe6e9;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

/////////////////Dropzone은 Upload 컴포넌트의 자식 컴포넌트입니다./////////////////////////////

function MyDropzone(props) {
  const dispatch = useDispatch();

  const onDrop = useCallback(async (acceptedFiles) => {
    dispatch(loadingScreen);

    // 사용자가 올린 정보를 확인해야 하므로 일단 서버로 전송합니다.
    // 제목 같은 건 폼을 제출한 이후에 달아주도록 합시다.

    // 받은 파일의 확장자와 용량을 체크해서 걸러냅니다.
    const re = [
      // /.gif/,
      /.jpg/,
      /.jpeg/,
      /.JPG/,
      // /.GIF/,
      /.JPEG/,
      /.PNG/,
      /.png/,
      /.WEBP/,
      /.webp/,
    ];
    const extCheck = re.map((el) => el.exec(acceptedFiles[0].name));

    // null이 아닌 값을 찾는데 전부 null이라면(올려서는 안되는 이미지) undefined를 반환하겠죠.
    if (extCheck.find((el) => el !== null) === undefined) {
      dispatch(loadingScreenOff);
      openNotification(
        "확장자가 다릅니다",
        "jpg, jpeg, png, webp만 받습니다. gif는 추후 추가 예정입니다."
      );
      return;
    }

    if (Number(acceptedFiles[0].size) >= 5 * 1024 * 1024) {
      // 에러와 관련된 redux 처리 요망
      dispatch(loadingScreenOff);
      openNotification(
        "5mb 이상의 이미지입니다",
        "너무 큰 짤은 짤이 아니었음을..."
      );
      return;
    }

    // 폼데이터 구성
    const formData = new FormData();
    const config = {
      header: {
        "content-type": "multipart/form-data",
      },
    };
    formData.append("file", acceptedFiles[0]);

    await axios.post("/api/image/upload", formData, config).then((res) => {
      // 부모 컴포넌트로부터 받은 setState를 사용합니다. 자식 컴포넌트의 props를 부모 state로 전달!
      props.setimageUrl(res.data.data.location);
    });
    dispatch(loadingScreenOff);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const InputProps = {
    ...getInputProps(),
    multiple: false,
    accept: "image/jpg, image/jpeg, image/png, image/webp",
  };

  const RootProps = {
    ...getRootProps(),
  };

  return (
    <DropZone {...RootProps} maxSize={100} multiple={false}>
      <input {...InputProps} />
      {isDragActive ? (
        <p>이제 이미지를 놓아주세요</p>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: "3em", marginBottom: "5px" }}>
            <i className="fas fa-file-upload"></i>
          </div>
          <div>이미지 드랍 or 클릭</div>
          <div>gif / jpg / jpeg / png / webp</div>
        </div>
      )}
    </DropZone>
  );
}

function Upload(props) {
  const [title, settitle] = useState("");
  const [imageUrl, setimageUrl] = useState("");
  const [ShowPreview, setShowPreview] = useState(false);

  const dispatch = useDispatch();

  const { userId, nickname } = props.user;

  const handleTitleChange = (e) => {
    settitle(e.target.value);
  };

  const postImage = (e) => {
    e.preventDefault();
    dispatch(loadingScreen);

    if (imageUrl === "") {
      dispatch(loadingScreenOff);
      openNotification("이미지를 첨부하세요!");
      return;
    }

    // 배포시에는 baseURL을 지워줘야 합니다.
    axios
      .post("/api/image/fullupload", {
        imageUrl,
        title,
        userId,
        nickname,
      })
      .then((res) => {
        if (!res.data.imageSave)
          return openNotification("이미지 업로드 실패 ㅜㅜ");
        return openNotification("이미지 업로드 성공!");
      });

    settitle("");
    setimageUrl("");
    setShowPreview(false);
    dispatch(loadingScreenOff);
  };

  useEffect(() => {
    setShowPreview(true);
  }, [imageUrl]);

  return (
    <>
      <Form onSubmit={postImage}>
        <MyDropzone setimageUrl={setimageUrl} />
        <br />
        <br />
        {ShowPreview ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={
                imageUrl
                  ? imageUrl
                  : "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FyC1PJ%2FbtqFe26Rmyu%2FRIB7h7kGQQCDqkJrTHuGk1%2Fimg.jpg"
              }
              style={{ width: "50%" }}
              alt="Preview"
            ></img>
          </div>
        ) : (
          <div>
            <p>미리보기</p>
          </div>
        )}

        <br />
        <br />
        <label htmlFor="title">제목을 적어주세요</label>
        <br />
        <Input
          type="text"
          id="title"
          required
          maxLength="15"
          placeholder="15자 제한"
          autoComplete="off"
          value={title}
          onChange={handleTitleChange}
        ></Input>
        <br />
        <br />
        <JoinUs type="submit">업로드</JoinUs>
      </Form>
    </>
  );
}

export default withRouter(Upload);
