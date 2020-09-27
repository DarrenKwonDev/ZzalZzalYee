import React from "react";
import LoginModal from "./LoginModal";
import { useSelector } from "react-redux";
import styled from "styled-components";
import "./Layout.css";

const LoadingScreen = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1000000;
  color: white;
`;

const WholeBody = styled.div`
  display: absolute;
  padding: 2em 4em;
  @media all and (max-width: 767px) {
    padding: 2em;
  }
`;

function Layout({ children }) {
  const loading = useSelector((state) => state.global);
  return (
    <WholeBody>
      <LoginModal />
      {loading.loading ? (
        <LoadingScreen>
          <div className="loader">Loading...</div>
        </LoadingScreen>
      ) : (
        ""
      )}
      {children}
    </WholeBody>
  );
}

export default Layout;
