import React, { useEffect, useState } from "react";
import axios from "axios";

function withNotAuthHoc(WrappedComponents) {
  const AuthenticationCheck = (props) => {
    const [userData, setuserData] = useState("");
    useEffect(() => {
      axios.post("/auth/jwtauthcheck").then((res) => {
        setuserData(res.data);
        if (res.data.isAuth)
          return props.history.push("/", {
            data: "로그인도 하신 분이 여길 왜 오심 ㅎ",
          });
      });
    }, []);
    return <WrappedComponents user={userData} />;
  };
  return AuthenticationCheck;
}

export default withNotAuthHoc;
