import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//영어 대,소문자, 0~9, -_ 이렇게 가능함을 나타냄. 3~23자 제한
const USER_REGEX = /^[a-zA-Z][a-zA-z0-9-_]{3,23}$/;
//영 대/소문자, 0~9, 특수문자, 8~24자 제한
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  //ref는 해당 창에 포커스 되도록 요청할 때 사용됨.
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  //첫 컴포넌트가 화면에 떴을 때 포커스 하기
  useEffect(() => {
    userRef.current.focus();
  }, []); //dependency가 없기 때문에 아무것도 안들어감

  useEffect(() => {
    const result = USER_REGEX.test(user); //위에서 만든 사용자 이름 적합도 판별
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]); // 사용자 아이디가 가능한지 판별하기 위한 dependency가 필요해 user를 넣어줌

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd; //boolean으로 두 번의 비밀번호 입력이 같은지 확인
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  return (
    <section>
      <p
        ref={errRef}
        //에러메세지가 있으면 errMsg state에 errmsg를 띄우고, 없으면 offscreen
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Register</h1>
      <form>
        <label htmlFor="username">Username:</label>
      </form>
    </section>
  );
};

export default Register;
