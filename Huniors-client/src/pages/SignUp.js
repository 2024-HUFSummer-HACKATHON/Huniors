import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import { RadioGroup, Radio } from "@mui/material";
import { useNavigate } from "react-router-dom";
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

const initialSendData = {
    email: "",
    password: "",
    name: "",
    gender: "",
};

const SignUp = () => {
    const nav = useNavigate();

    const [errors, setErrors] = useState({
        name: true,
        email: true,
        password: true,
    });

    const [sendData, setSendData] = useState(initialSendData);
    const [showModal, setShowModal] = useState(false);
    const [modalText, setModalText] = useState("");
    const [modalTitle, setModalTitle] = useState("");
    const [shouldNavigate, setShouldNavigate] = useState(false);

    const validateEmail = (email) =>
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

    const validatePassword = (password) =>
        /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/.test(
            password
        );

    const validateField = (name, value) => {
        switch (name) {
            case "email":
                return validateEmail(value);
            case "password":
                return validatePassword(value);
            case "name":
                return /^[가-힣a-zA-Z]+$/.test(value);
            default:
                return true;
        }
    };

    const checkField = (e) => {
        const { name, value } = e.target;
        const isValid = validateField(name, value);
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: !isValid,
        }));
        setSendData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const isFormValid = () => {
        return (
            !errors.name &&
            !errors.email &&
            !errors.password &&
            sendData.name &&
            sendData.email &&
            sendData.password
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isFormValid()) {
            try {
                const response = await axios.post(
                    "https://my-little-pelican-58844a067eda.herokuapp.com/api/signup",
                    sendData,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (response.status === 201) {
                    setModalTitle("회원가입에 성공하셨습니다.");
                    setModalText("로그인을 해주세요.");
                    setShouldNavigate(true);
                    setShowModal(true);
                } else {
                    console.error("회원가입에 실패했습니다.");
                }
            } catch (error) {
                if (error.response && error.response.status === 409) {
                    setModalTitle("이미 존재하는 이메일입니다.");
                    setModalText("다른 이메일을 사용해주세요.");
                } else {
                    setModalTitle("서버 오류가 발생했습니다.");
                    setModalText("다시 시도해주세요.");
                }
                setShouldNavigate(false);
                setShowModal(true);
            }
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        if (!showModal && shouldNavigate) {
            nav("/");
        }
    }, [showModal, shouldNavigate, nav]);

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
                    <div className="SignUp">
                        <div className="whole">
                            <div className="head">
                                <h2> Sign Up</h2>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="signup_name_texfield">
                                    <p>이름</p>
                                    <TextField
                                        value={sendData.name}
                                        label="이름"
                                        required
                                        name="name"
                                        margin="normal"
                                        color="primary"
                                        fullWidth
                                        autoFocus
                                        error={errors.name && sendData.name !== ""}
                                        onChange={checkField}
                                        helperText={
                                            errors.name && sendData.name !== ""
                                                ? "올바른 이름을 입력하세요"
                                                : null
                                        }
                                    />
                                </div>
                                <div className="signup_name_texfield">
                                    <p>이메일</p>
                                    <TextField
                                        value={sendData.email}
                                        label="이메일"
                                        required
                                        name="email"
                                        margin="normal"
                                        color="primary"
                                        fullWidth
                                        error={errors.email && sendData.email !== ""}
                                        onChange={checkField}
                                        helperText={
                                            errors.email && sendData.email !== ""
                                                ? "올바른 이메일을 입력하세요"
                                                : null
                                        }
                                    />
                                </div>
                                <div className="signup_name_texfield">
                                    <p>비밀번호</p>
                                    <TextField
                                        value={sendData.password}
                                        label="비밀번호"
                                        required
                                        name="password"
                                        type="password"
                                        margin="normal"
                                        color="primary"
                                        fullWidth
                                        error={errors.password && sendData.password !== ""}
                                        onChange={checkField}
                                        helperText={
                                            errors.password && sendData.password !== ""
                                                ? "특수 문자, 숫자를 포함하여 8자 이상이어야 합니다"
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
                                    disabled={!isFormValid()}
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    가입하기
                                </Button>
                            </form>
                            <Grid className="signup_link">
                                이미 계정이 있으신가요???{" "}
                                <Link to="/signin" style={{ color: '#DD761C' }}>로그인하러 가기</Link>{" "}
                            </Grid>
                            <BasicModal
                                text={modalText}
                                title={modalTitle}
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

export default SignUp;
