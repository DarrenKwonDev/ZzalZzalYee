import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { openNotification } from "../../utils";
import { useDispatch } from "react-redux";
import { loadingScreen, loadingScreenOff } from "../../reducers/global";
import axios from "axios";
import styled from "styled-components";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { UpCircleFilled } from "@ant-design/icons";

const ZzalChunk = styled.div`
  display: inline-block;
  border: 1px solid #eee;
  border-radius: 1em;
  margin-bottom: 1em;
  padding: 0.5em;
  cursor: pointer;
  figure {
    /* margin-bottom: 1em; */
  }
  figure img {
    width: 100%;
    border-radius: 1em;
  }
  figure figcaption {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5em;
  }
  figcaption .title {
    font-size: 1.3em;
    font-weight: bold;
    margin-bottom: 0.3em;
  }
  figcaption i {
    font-size: 1.3em;
    font-weight: bold;
  }
  &:hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    transition: box-shadow 0.5s ease-out;
    img {
      opacity: 0.6;
      filter: grayscale(0.5);
      transition: filter 0.5s ease-out, opacity 0.5s ease-out;
    }
  }
`;

const Wrapper = styled.div`
  column-count: 5;
  column-gap: 1em;
  @media all and (min-width: 1024px) and (max-width: 1280px) {
    column-count: 4;
    column-gap: 0.5em;
  }
  @media all and (min-width: 768px) and (max-width: 1023px) {
    column-count: 3;
    column-gap: 0.35em;
  }
  @media all and (max-width: 767px) {
    column-count: 2;
    column-gap: 0.2em;
  }
  @media all and (max-width: 450px) {
    column-count: 1;
    column-gap: 0.1em;
  }
`;

const CopySuccess = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25%;
  height: 7.5%;
  top: 5%;
  left: 35%;
  background-color: white;
  color: black;
  font-size: 1.5em;
  font-weight: 500;
  border-radius: 0.3em;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  z-index: 10000000000;
  transition: top 3s ease-in-out;

  @media all and (max-width: 767px) {
    font-size: 0.8em;
    left: 35%;
    width: 30%;
    height: 5%;
  }
`;

const FAB = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: red;
  font-size: 4em;
  left: 92.5%;
  top: 90%;
  width: 0;
  height: 0;
  z-index: 100;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  cursor: pointer;
  @media all and (max-width: 767px) {
    font-size: 3em;
    left: 85%;
  }
`;

function Home(props) {
  let [image, setimage] = useState([]);
  let [hitBottom, sethitBottom] = useState(false);
  let [iterator, setiterator] = useState(1);
  const [Copy, setCopy] = useState(false);
  const [end, setend] = useState(false);

  const dispatch = useDispatch();

  // 강제로 팅기면서 돌아오는 경우 해당 함수가 실행됨

  useEffect(() => {
    if (props.location.state?.data) {
      openNotification(props.location.state.data);
      props.history.replace("/", null);
      setiterator(1);
    }
    return (props.location.state = undefined);
  }, []);

  // 지금 요놈이 리다이렉트 하면서 문제
  useEffect(() => {
    sethitBottom(false);
    axios
      .post(`/api/image/request/${iterator}`)
      .then((res) => {
        if (!res.data.imageSucess) {
          dispatch(loadingScreenOff);
          return openNotification("이미지를 불러오는데 실패했습니다.");
        }
        iterator++;
        setiterator(iterator);

        if (res.data.image.length === 0) {
          setend(true);
          dispatch(loadingScreenOff);
        }
        image = [...image, ...res.data.image];
        setimage(image);

        dispatch(loadingScreenOff);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [hitBottom]);

  // 인피니티 스크롤

  useEffect(() => {
    const onScroll = () => {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 100
      ) {
        dispatch(loadingScreen);
        sethitBottom(true);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  });

  // notification 관련 함수들

  useEffect(() => {
    return () => {
      setTimeout(() => {
        setCopy(false);
      }, 2000);
    };
  }, [Copy]);

  useEffect(() => {
    return () => {
      setTimeout(() => {
        setend(false);
      }, 2000);
    };
  }, [end]);

  // 드디어, 최종 렌더링 하는 곳

  return (
    <>
      {Copy ? (
        <CopySuccess>
          <span role="img" aria-label="copy">
            ✅
          </span>
          복사되었습니다!
        </CopySuccess>
      ) : (
        ""
      )}
      {end ? (
        <CopySuccess>
          <span role="img" aria-label="empty">
            😢
          </span>
          짤이 바닥났어요
        </CopySuccess>
      ) : (
        ""
      )}

      <Wrapper>
        {image.map((el) => (
          <CopyToClipboard
            text={`${el.imageUrl}`}
            onCopy={() => setCopy(true)}
            key={Math.random()}
          >
            <ZzalChunk className="zzalChunk" key={Math.random()}>
              <figure>
                <img
                  className="insideImage"
                  src={`${el.imageUrl}`}
                  alt="zzal"
                  key={el._id}
                />
                <figcaption>
                  <div>
                    <div className="title">{el.title}</div>
                    <div className="nickname">업로더 : {el.nickname}</div>
                  </div>
                  <i className="fas fa-link"></i>
                </figcaption>
              </figure>
            </ZzalChunk>
          </CopyToClipboard>
        ))}
      </Wrapper>
      <FAB onClick={() => window.scrollTo(0, 0)}>
        <UpCircleFilled />
      </FAB>
    </>
  );
}

export default withRouter(Home);
