import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { Title, Description, Mark } from "./Sections/Desc";

const HowWrapper = styled.div`
  /* background-color: red; */
  padding: 3em;
  @media all and (max-width: 767px) {
    padding: 1em;
  }
`;

const Image = styled.img`
  width: 50%;
  display: block;
  margin-bottom: 5em;
  @media all and (max-width: 767px) {
    width: 80%;
  }
`;

function HowToUse() {
  return (
    <HowWrapper>
      <div style={{ marginBottom: "2em" }}>
        <Title>
          <span role="img" aria-label="emo">
            📋
          </span>
          복사하기
        </Title>
        <Description>짤을 누르면 자동으로 경로가 복사됩니다!</Description>
        <Image src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FcpkLpL%2FbtqFhLvzEO7%2FaHJIkC0BrbDvce504SEptK%2Fimg.png"></Image>
        <Description>
          아니면 <Mark>이미지 복사</Mark>를 누르셔도 됩니다.
        </Description>
        <Image src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FbrBJQx%2FbtqFhL4cM8Z%2FUnvx8HJkAqCgKQ50iPuKJ0%2Fimg.png"></Image>
      </div>
      <div>
        <Title>
          <span role="img" aria-label="clip">
            📎
          </span>
          첨부하기
        </Title>
        <Description>카카오톡을 예시로 들겠습니다.</Description>
        <Description>
          경로를 복사한 경우에는 파일 전송을 누르고 경로를 붙여넣습니다
        </Description>
        <Image src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FqcOGn%2FbtqFfYCZWVR%2FZdEDRNkn7heLT8wZI6KTHK%2Fimg.png"></Image>
        <Image src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FbRCJoU%2FbtqFgxruuQo%2FIzuk0NlKKylFKI7NskjY70%2Fimg.png"></Image>
        <Description>
          이미지를 복사한 경우에는 그냥 ctrl+V로 붙여넣습니다
        </Description>
        <Image src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2Fb5YxLd%2FbtqFiOlS6Ez%2FZuA8lS4t7V8Zzmpm094IzK%2Fimg.png"></Image>
      </div>
    </HowWrapper>
  );
}

export default withRouter(HowToUse);
