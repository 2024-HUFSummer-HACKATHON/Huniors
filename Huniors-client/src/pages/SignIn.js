import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import BasicModal from "../components/BasicModal";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#DD761C',
    },
  },
});

const SignIn = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [emailErrors, setEmailErrors] = useState(true);
    const [passwordErrors, setPasswordErrors] = useState(true);
    const [sendData, setSendData] = useState({
        email: "",
        password: "",
    });
    const [showModal, setShowModal] = useState(false);
    const nav = useNavigate();
    const API = axios.create();

    useEffect(() => {
        axios.post('https://my-little-pelican-58844a067eda.herokuapp.com/api/checktoken')
            .then(res => {
            setIsLoggedIn(res.data.isLoggedIn);
            console.log("로그인 상태 저장 완료");
            })
            .catch(err => {
            console.error('로그인 상태 확인 중 오류 발생:', err);
            });
    },  []);

    const closeModal = () => {
        setShowModal(false);
        nav("/signin");
    };

    const onchange = (e) => {
        setSendData({
            ...sendData,
            [e.target.name]: e.target.value,
        });
    };

    const checkEmail = (e) => {
        var regExp =
            /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
        setEmailErrors(!regExp.test(e.target.value));
    };

    const checkPassword = (e) => {
        var regExp2 =
            /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/;
        setPasswordErrors(!regExp2.test(e.target.value));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "https://my-little-pelican-58844a067eda.herokuapp.com/api/signin",
                sendData
            );

            if (response.status === 200) {
                console.log("로그인 성공");
                nav("/");
            } else {
                console.log("로그인 실패");
                nav("/signin");
            }
        } catch (error) {
            setShowModal(true);
        }
    };

    if (isLoggedIn)
        nav("/");

    else {
        return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <div className="SignIn">
                        <div className="whole">
                            <div className="head">
                                <h2>Log In</h2>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="email_textfield">
                                    <TextField
                                        value={sendData.email}
                                        label="이메일"
                                        required
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                        margin="normal"
                                        color="primary"
                                        fullWidth
                                        error={emailErrors && sendData.email !== ""}
                                        onChange={(e) => {
                                            onchange(e);
                                            checkEmail(e);
                                        }}
                                        helperText={
                                            emailErrors && sendData.email !== ""
                                                ? "이메일 형식을 지켜주세요"
                                                : null
                                        }
                                    />
                                </div>
                                <div className="password_textfield">
                                    <TextField
                                        value={sendData.password}
                                        label="비밀번호"
                                        type="password"
                                        required
                                        name="password"
                                        autoComplete="current-password"
                                        margin="normal"
                                        color="primary"
                                        fullWidth
                                        error={passwordErrors && sendData.password !== ""}
                                        onChange={(e) => {
                                            onchange(e);
                                            checkPassword(e);
                                        }}
                                        helperText={
                                            passwordErrors && sendData.password !== ""
                                                ? "비밀번호 형식을 지켜주세요"
                                                : null
                                        }
                                    />
                                </div>
                                <Button
                                    className="submit_button"
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    login
                                </Button>
                            </form>
                            <Grid className="signup_link">
                                아이디가 없으신가요? <Link to="/signup" style={{ color: '#DD761C' }}>Sign up</Link>
                            </Grid>
                            <BasicModal
                                text={"로그인에 실패했습니다."}
                                title={"올바른 이메일과 비밀번호를 입력하세요."}
                                open={showModal}
                                closeModal={closeModal}
                            />
                        </div>
                    </div>
                </Box>
            </Container>
        </ThemeProvider>
    );
};
}

export default SignIn;
