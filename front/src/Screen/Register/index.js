import React, { useState, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loadingScreen, loadingScreenOff } from "../../reducers/global";
import { openNotification } from "../../utils";

const RegisterForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3em;
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
  ::-webkit-input-placeholder {
    font-size: 0.5em;
  }
`;

function Register(props) {
  const [userEmail, setuserEmail] = useState("");
  const [nickname, setnickname] = useState("");
  const [password, setpassword] = useState("");
  const [passwordCheck, setpasswordCheck] = useState("");
  const [erorPasswordCheck, seterorPasswordCheck] = useState(false);
  const [passwordRegexCheck, setpasswordRegexCheck] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let body = {
      userEmail,
      nickname,
      password,
      passwordCheck,
    };

    if (password.length < 6) {
      return openNotification(
        "비밀번호는 6자리 이상이어야 합니다.",
        "6666666666",
        "🔐"
      );
    }

    dispatch(loadingScreen);

    axios.post("/auth/register", body).then((res) => {
      if (!res.data.registerSuccess) {
        openNotification(res.data.message);
        dispatch(loadingScreenOff);
      }
      if (res.data.registerSuccess) {
        // 가입에 성공했으니 가입처리를 하고 home으로 redirect 시킵니다.

        let body = {
          userEmail,
          password,
        };

        axios.post("/auth/login", body).then((res) => {
          if (!res.data.loginSuccess) {
            openNotification(res.data.message);
            dispatch(loadingScreenOff);
          }
          if (res.data.loginSuccess) {
            const { nickname, token } = res.data;

            localStorage.setItem(
              "ZzalZzal",
              JSON.stringify({ token, nickname })
            );
            // 회원가입창에서 새로고침하면 history가 없다. history 쓰지마
            return window.location.replace("/");
          }
        });

        dispatch(loadingScreenOff);
      }
    });

    setpassword("");
    setpasswordCheck("");
    dispatch(loadingScreenOff);
  };

  return (
    <RegisterForm>
      <form onSubmit={handleSubmit}>
        <label htmlFor="userEmail">Email</label>
        <br />
        <Input
          type="email"
          id="userEmail"
          name="userEmail"
          value={userEmail}
          placeholder="[여기에 이메일 입력]"
          onChange={(e) => setuserEmail(e.target.value)}
        ></Input>
        <br />
        <label htmlFor="nickname">닉네임</label>
        <br />
        <Input
          type="text"
          id="nickname"
          name="nickname"
          value={nickname}
          placeholder="닉네임을 입력하세요"
          onChange={(e) => setnickname(e.target.value)}
        ></Input>
        <br />
        <label htmlFor="password">비밀번호</label>
        <br />
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(e) => {
            if (password.length < 5) {
              setpasswordRegexCheck(true);
            } else {
              setpasswordRegexCheck(false);
            }
            setpassword(e.target.value);
          }}
        ></Input>
        <br />
        {passwordRegexCheck ? (
          <div style={{ margin: "0.5em 0", color: "red" }}>
            <div style={{ margin: "0.2em 0" }}>6자리 이상 입력해주세요</div>
            <div>비밀번호 486 아님 ( ͡° ͜ʖ ͡°) </div>
          </div>
        ) : (
          ""
        )}
        <label htmlFor="passwordCheck">비밀번호 재확인</label>
        <br />
        <Input
          type="password"
          id="passwordCheck"
          name="passwordCheck"
          placeholder="위와 같은 비밀번호를 입력하세요"
          value={passwordCheck}
          onChange={useCallback(
            (e) => {
              seterorPasswordCheck(e.target.value !== password);
              setpasswordCheck(e.target.value);
            },
            [password]
          )}
        ></Input>
        <br />
        {erorPasswordCheck ? (
          <div style={{ margin: "0.5em 0", color: "red" }}>
            <div style={{ margin: "0.2em 0" }}>비밀번호가 같지 않습니다.</div>
            <div>처음부터 다시 입력해주세요</div>
          </div>
        ) : (
          ""
        )}
        <div>
          <span>약관? 그런 건 우리에게 있을 수가 없어</span>
        </div>
        <JoinUs>회원가입</JoinUs>
      </form>
    </RegisterForm>
  );
}

export default Register;
