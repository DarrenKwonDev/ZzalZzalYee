import React, { useEffect, useState } from "react";
import axios from "axios";

function withAuthHoc(WrappedComponents) {
  const AuthenticationCheck = (props) => {
    const [userData, setuserData] = useState("");
    useEffect(() => {
      axios.post("/auth/jwtauthcheck").then((res) => {
        setuserData(res.data);
        if (!res.data.isAuth)
          return props.history.push("/", {
            data: "로그인한 회원만 업로드할 수 있습니다.",
          });
      });
    }, []);
    return <WrappedComponents user={userData} />;
  };
  return AuthenticationCheck;
}

export default withAuthHoc;
