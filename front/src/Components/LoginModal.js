import React, { useState } from "react";
import { Modal } from "antd";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { closeLoginModalScreen } from "../reducers/global";
import { Link, withRouter } from "react-router-dom";
import { loadingScreen, loadingScreenOff } from "../reducers/global";
import styled from "styled-components";
import { openNotification } from "../utils";

const LoginWarpper = styled.div`
  display: flex;
  flex-direction: column;
  .intro {
    margin-bottom: 1em;
    font-size: 2em;
    font-weight: bold;
    @media all and (max-width: 767px) {
      font-size: 1.3em;
    }
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

const JoinUs = styled.button`
  border: none;
  border-radius: 2px;
  margin: 1em 0 0 0;

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

const LoginButton = styled.button`
  border: none;
  border-radius: 2px;
  margin: 1em 0 1em 0;

  background-color: transparent;
  font-weight: bold;
  color: #00b894;
  border: 2px solid #00b894;
  cursor: pointer;
  &:hover {
    background-color: #00b894;
    color: white;
    transition: background-color 0.2s ease-in-out;
  }
  a:hover {
    color: white;
  }
`;

const CancelButton = styled.button`
  border: none;
  border-radius: 2px;

  background-color: transparent;
  font-weight: bold;
  color: #b2bec3;
  border: 2px solid #b2bec3;
  cursor: pointer;
  &:hover {
    background-color: #b2bec3;
    color: white;
    transition: background-color 0.2s ease-in-out;
  }
  a:hover {
    color: white;
  }
`;

function LoginModal(props) {
  const dispatch = useDispatch();
  const openLoginModal = useSelector((state) => state.global);

  const [userEmail, setuserEmail] = useState("");
  const [password, setpassword] = useState("");

  const handleIdChange = (e) => {
    setuserEmail(e.target.value);
  };

  const handlePWChange = (e) => {
    setpassword(e.target.value);
  };

  const handleLoginSubmit = () => {
    dispatch(loadingScreen);

    let body = {
      userEmail,
      password,
    };
    setuserEmail("");
    setpassword("");

    axios.post("/auth/login", body).then((res) => {
      if (!res.data.loginSuccess) {
        openNotification(res.data.message);
        dispatch(loadingScreenOff);
      }
      if (res.data.loginSuccess) {
        const { nickname, token } = res.data;

        localStorage.setItem("ZzalZzal", JSON.stringify({ token, nickname }));
        dispatch(loadingScreenOff);
        dispatch(closeLoginModalScreen);
        // replace하면 아예 화면이 새로고침되어서 로드를 다시하게 된다. spa를 쓰는 이유가 없어져버려
        // window.location.replace("/");
        props.history.push("/");
      }
    });
  };

  return (
    <Modal
      zIndex={1}
      closable={false}
      visible={openLoginModal.openLoginModal}
      onCancel={() => dispatch(closeLoginModalScreen)}
      footer={[
        <CancelButton
          key="back"
          onClick={() => dispatch(closeLoginModalScreen)}
        >
          취소
        </CancelButton>,
      ]}
    >
      <div>
        <LoginWarpper onSubmit={handleLoginSubmit}>
          <div className="intro">
            <span role="img" aria-label="intro">
              🔥
            </span>{" "}
            어서옵쇼~
          </div>
          <Input
            type="email"
            name="userEmail"
            value={userEmail}
            onChange={handleIdChange}
            placeholder="이메일"
          ></Input>
          <Input
            type="password"
            name="password"
            value={password}
            onChange={handlePWChange}
            placeholder="비밀번호"
          ></Input>
          <LoginButton key="login" onClick={handleLoginSubmit}>
            로그인
          </LoginButton>
        </LoginWarpper>

        <div style={{ fontSize: "15px" }}>
          아이디가 없으시다면 회원가입 버튼을...
        </div>
        <div style={{ fontSize: "15px" }}>그런데 클릭을 곁들인</div>
        <JoinUs
          onClick={() => {
            dispatch(closeLoginModalScreen);
            // push는 새로고침 시 말을 안 듣습니다
            props.history.go("/register");
          }}
        >
          <Link to="/register">회원가입</Link>
        </JoinUs>
      </div>
    </Modal>
  );
}

export default withRouter(LoginModal);
