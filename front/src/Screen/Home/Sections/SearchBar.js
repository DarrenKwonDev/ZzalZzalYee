const [searchError, setsearchError] = useState(false);
const [SearchTerm, setSearchTerm] = useState("");

const Search = styled.input`
  width: 100%;
  padding: 0 1em;
  border: 2px solid #eee;
  border-radius: 0.7em 0em 0em 0.7em;
  height: 2em;
  margin: 1em 0;
  font-size: 2em;
  display: inline-block;
  vertical-align: center;
  background-color: ${(props) =>
    props.searchError ? "#F5222D" : "transparent"};

  ::placeholder {
    color: ${(props) => (props.searchError ? "#F5222D" : "#A3B1BF")};
  }

  @media all and (max-width: 767px) {
    font-size: 1em;
    ::placeholder {
      font-size: 1em;
    }
  }
`;

const SearchButton = styled.button`
  height: 2.8em;
  width: 75px;
  display: inline-block;
  border-radius: 0em 0.8em 0.8em 0em;
  border: 1px solid #eee;
  cursor: pointer;
  text-align: center;
  vertical-align: center;
  @media all and (max-width: 767px) {
    border-radius: 0em 0.5em 0.5em 0em;
    height: 1.4em;
    width: 55px;
  }
`;

const SearchSubmit = (e) => {
  e.preventDefault();

  // 검색어 3글자 이하면 팅겨냄
  if (SearchTerm.length <= 3) {
    setsearchError(true);
    setSearchTerm("");
    return;
  }

  // 로딩창 띄우시고
  dispatch(loadingScreen);

  // DB에서 검색 실시
  axios
    .post(`/api/search/${SearchTerm}`)
    .then((res) => {
      const { data } = res;
      //{searchSucess: true, output: Array(11)}
      console.log(data.info);
      if (!data.searchSucess) {
        // 검색 실패시 취할 행동
      }
      // 성공시
      setimage([...image, ...data.info]);
    })
    .catch((err) => {
      console.log(err);
    });
  setSearchTerm("");
  dispatch(loadingScreenOff);
};

useEffect(() => {
  return () => {
    setTimeout(() => {
      setsearchError(false);
    }, 2000);
  };
}, [searchError]);

<form
  onSubmit={SearchSubmit}
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }}
>
  <Search
    type="text"
    placeholder="검색어를 입력하세요"
    name="searchTerm"
    searchError={searchError}
    onChange={(e) => {
      setSearchTerm(e.target.value);
    }}
    value={SearchTerm}
  ></Search>
  <SearchButton type="submit">
    <i className="fas fa-search"></i>
  </SearchButton>
</form>;

{
  searchError ? (
    <CopySuccess>
      <span role="img" aria-label="empty">
        😢
      </span>
      4글자 이상 입력해주세요
    </CopySuccess>
  ) : (
    ""
  );
}
