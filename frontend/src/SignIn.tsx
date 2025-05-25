import * as React from "react";
import { motion } from "framer-motion";
import Link from '@mui/material/Link';
import {
  Box,
  Button,
  Checkbox,
  CssBaseline,
  FormControl,
  FormControlLabel,
  FormLabel,
  TextField,
  Typography,
  Stack,
  Alert,
  IconButton,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import MuiCard from "@mui/material/Card";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AppTheme from "./shared-theme/AppTheme";
import AppAppBarUser from "./dashboardMain/components/AppAppBarUser";
import Footer from "./dashboardMain/components/Footer";

const Card = styled(motion(MuiCard))(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  minHeight: "100vh",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
}));

const LeftSection = styled(motion(Box))(({ theme }) => ({
  flex: 1,
  color: theme.palette.text.primary,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(4),
  [theme.breakpoints.down("sm")]: {
    paddingBottom: theme.spacing(2),
    textAlign: "center",
  },
}));

const RightSection = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(4),
}));

export default function SignIn(props) {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [alertMessage, setAlertMessage] = React.useState(null);
  const [alertType, setAlertType] = React.useState("success");
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email.");
      return;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters.");
      return;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/users/sign-in", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      setAlertMessage("Login successful!");
      setAlertType("success");

      setTimeout(() => {
        setLoading(false);
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      setLoading(false);
      setAlertMessage(
        error.response?.data?.error || "An error occurred. Please try again."
      );
      setAlertType("error");
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBarUser />
      <SignInContainer
        direction={isSmallScreen ? "column" : "row"}
        justifyContent="center"
        alignItems="stretch"
        spacing={2}
      >
        <LeftSection
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <br />
          <br />
          <br />
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to ScrapeWatch
          </Typography>
          {!isSmallScreen && (
            <>
              <Typography variant="h6" color="text.secondary" paragraph>
                Monitor websites efficiently by scraping and tracking changes
                automatically.
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Stay updated with real-time alerts, analyze trends, and manage
                your scraping tasks effortlessly.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Join thousands of users who trust ScrapeWatch to stay ahead.
              </Typography>
            </>
          )}
        </LeftSection>

        <RightSection>
          <Card
            variant="outlined"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {alertMessage && (
              <Box sx={{ mb: 2 }}>
                <Alert
                  variant="filled"
                  severity={alertType}
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => setAlertMessage(null)}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  }
                >
                  {alertMessage}
                </Alert>
              </Box>
            )}
            <Typography component="h2" variant="h4" align="center" gutterBottom>
              Login
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: 2,
              }}
            >
              <FormControl>
                <FormLabel>Email</FormLabel>
                <TextField
                  name="email"
                  type="email"
                  required
                  fullWidth
                  defaultValue="chinchejay@gmail.com"
                  error={emailError}
                  helperText={emailErrorMessage}
                  disabled={loading}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <TextField
                  name="password"
                  type="password"
                  required
                  fullWidth
                  defaultValue="123456"
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  disabled={loading}
                />
              </FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    value="remember"
                    color="primary"
                    disabled={loading}
                  />
                }
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                startIcon={
                  loading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : null
                }
                sx={{
                  bgcolor: theme.palette.primary.main,
                  color: "#000",
                  "&:hover": {
                    // bgcolor: theme.palette.primary.dark,
                  },
                  "&.Mui-disabled": {
                    bgcolor: theme.palette.primary.main,
                    color: "#000", // Keep text white even when disabled
                  },
                }}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>

              <Box textAlign="center" mt={2}>
                <Typography variant="body2">
                  New here?{" "}
                  <Link href="/register" underline="hover">
                    Register now
                  </Link>
                  
                </Typography>
              </Box>
            </Box>
          </Card>
        </RightSection>
      </SignInContainer>
      <Footer />
    </AppTheme>
  );
}
