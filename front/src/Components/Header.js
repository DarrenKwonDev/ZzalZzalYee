import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openLoginModalScreen } from "../reducers/global";
import { loadingScreen, loadingScreenOff } from "../reducers/global";
import { logout } from "../reducers/user";
import axios from "axios";

const LayoutHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  align-items: center;
  margin-bottom: 5em;
  padding: 1em 0 3em 0;
  border-bottom: 1px solid black;

  @media all and (max-width: 767px) {
    padding: 0.5em 0 2em 0;
    margin-bottom: 3em;
  }

  button {
    border: none;
    border-radius: 2px;
    margin: 0 0.3em;
    height: 2em;
  }

  .LoginButton,
  .LogoutButton,
  .HowButton,
  .UploadButton {
    font-size: 15px;
  }

  @media all and (min-width: 867px) and (max-width: 1023px) {
    .LoginButton,
    .LogoutButton,
    .HowButton,
    .UploadButton {
      font-size: 12px;
    }
  }

  @media all and (max-width: 867px) {
    grid-template-columns: 1fr;
    justify-items: center;
    align-items: center;
    .LoginButton,
    .LogoutButton,
    .HowButton,
    .UploadButton {
      font-size: 11px;
    }
    .userButton {
      margin: 1.5em 0 0.5em 0;
      justify-content: center;
    }
    .selfIntro {
      margin: 0 0 1em 0;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  .LoginButton {
    background-color: transparent;
    font-weight: bold;
    color: #0170fe;
    border: 2px solid #0170fe;
    cursor: pointer;
    &:hover {
      background-color: #0170fe;
      color: white;
      transition: background-color 0.2s ease-in-out;
    }
    a:hover {
      color: white;
    }
  }

  .LogoutButton {
    background-color: transparent;
    font-weight: bold;
    color: #7f8c8d;
    border: 2px solid #7f8c8d;
    cursor: pointer;
    &:hover {
      background-color: #7f8c8d;
      color: white;
      transition: background-color 0.2s ease-in-out;
    }
    a:hover {
      color: white;
    }
  }

  .UploadButton {
    background-color: transparent;
    font-weight: bold;
    color: #9b59b6;
    border: 2px solid #9b59b6;
    cursor: pointer;
    &:hover {
      background-color: #9b59b6;
      color: white;
      transition: background-color 0.2s ease-in-out;
    }
    a:hover {
      color: white;
    }
  }

  .HowButton {
    background-color: transparent;
    font-weight: bold;
    color: #e67e22;
    border: 2px solid #e67e22;
    cursor: pointer;
    &:hover {
      background-color: #e67e22;
      color: white;
      transition: background-color 0.2s ease-in-out;
    }
    a:hover {
      color: white;
    }
  }

  .hello {
    margin: 1em 0 0 0;
  }
`;

const UserButton = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Logo = styled.div`
  font-family: "Fugaz One", cursive;

  font-size: 2em;
  color: black;
  @media all and (min-width: 867px) and (max-width: 1023px) {
    font-size: 1.4em;
  }
  @media all and (max-width: 867px) {
    font-size: 1.7em;
  }
`;

function Header(props) {
  const dispatch = useDispatch();
  const nickname = JSON.parse(localStorage.getItem("ZzalZzal"))?.nickname;

  return (
    <>
      <LayoutHeader>
        <div className="selfIntro">
          <div style={{ margin: "0 0 0.5em 0" }}>
            <a href="https://darrengwon.tistory.com" style={{ color: "blue" }}>
              https://darrengwon.tistory.com
            </a>
          </div>
          <div>Contact me ( ͡° ͜ʖ ͡°) ❤</div>
        </div>
        <div
          className="logo"
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Link to="/">
            <Logo>
              ZzalZzalYEE <span>짤짤이</span>
            </Logo>
          </Link>
          {nickname ? (
            <div className="hello">
              <span role="img" aria-label="hello">
                😀 안녕하세요 {nickname}님!
              </span>
            </div>
          ) : (
            ""
          )}
        </div>
        <UserButton className="userButton">
          <Link to="/upload">
            <button className="UploadButton">
              <i className="fas fa-file-upload"></i>
              &nbsp; 업로드
            </button>
          </Link>
          <Link to="/how-to-use">
            <button className="HowButton">
              <i className="fas fa-question-circle"></i>
              &nbsp; 사용법
            </button>
          </Link>
          {nickname ? (
            <>
              <div>
                <div>
                  <button
                    className="LogoutButton"
                    onClick={() => {
                      localStorage.removeItem("ZzalZzal");
                      axios.post("/auth/logout").then((res) => {
                        dispatch(loadingScreen);
                        dispatch(logout());
                        dispatch(loadingScreenOff);
                        window.location.replace("/");
                      });
                    }}
                  >
                    <i className="fas fa-user"></i>
                    &nbsp; 로그아웃
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <button
                className="LoginButton"
                onClick={() => dispatch(openLoginModalScreen)}
              >
                <i className="fas fa-user"></i>
                &nbsp; 로그인
              </button>
            </>
          )}
        </UserButton>
      </LayoutHeader>
    </>
  );
}

export default withRouter(Header);
