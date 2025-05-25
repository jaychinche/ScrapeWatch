import * as React from 'react';
import { motion } from 'framer-motion';
import {
  Box, Button, Checkbox, CssBaseline, FormControl,
  FormControlLabel, FormLabel, TextField, Typography,
  Stack, Alert, IconButton, useTheme, useMediaQuery,
  CircularProgress, Link
} from '@mui/material';
import MuiCard from '@mui/material/Card';
import CloseIcon from "@mui/icons-material/Close";
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import AppTheme from './shared-theme/AppTheme';
import AppAppBarUser from "./dashboardMain/components/AppAppBarUser";
import Footer from "./dashboardMain/components/Footer";

const Card = styled(motion(MuiCard))(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
}));

const RegisterContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100vh',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
}));

const LeftSection = styled(motion(Box))(({ theme }) => ({
  flex: 1,
  color: theme.palette.text.primary,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    paddingBottom: theme.spacing(2),
    textAlign: 'center',
  },
}));

const RightSection = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(4),
}));

export default function Register(props) {
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [nameError, setNameError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');
  const [alertMessage, setAlertMessage] = React.useState(null);
  const [alertType, setAlertType] = React.useState("success");
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    let valid = true;

    if (!name.trim()) {
      setNameError(true);
      setNameErrorMessage("Name is required.");
      valid = false;
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email.");
      valid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters.");
      valid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (!valid) return;
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/users/register", {
        name,
        email,
        password,
      });
      setAlertMessage("Registration successful!");
      setAlertType("success");
      setTimeout(() => {
        setLoading(false);
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      setLoading(false);
      setAlertMessage(error.response?.data?.error || "An error occurred. Please try again.");
      setAlertType("error");
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBarUser />
      <RegisterContainer
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
          <br /><br /><br />
          <Typography variant="h4" component="h1" gutterBottom>
            Join ScrapeWatch
          </Typography>
          {!isSmallScreen && (
            <>
              <Typography variant="h6" color="text.secondary" paragraph>
                Start tracking the web like never before.
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Sign up to monitor websites, receive change alerts, and automate scraping workflows.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Thousands of users already trust ScrapeWatch.
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
              Register
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
            >
              <FormControl>
                <FormLabel>Name</FormLabel>
                <TextField
                  name="name"
                  type="text"
                  required
                  fullWidth
                  placeholder='Enter your name'
                 
                  error={nameError}
                  helperText={nameErrorMessage}
                  disabled={loading}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <TextField
                  name="email"
                  type="email"
                  required
                  fullWidth
                  placeholder='Enter your email'
                
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
                  placeholder='Enter your password'
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  disabled={loading}
                />
              </FormControl>
              <FormControlLabel
                control={<Checkbox value="terms" color="primary" disabled={loading} />}
                label="I agree to the Terms & Conditions"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                sx={{
                  bgcolor: theme.palette.primary.main,
                  color: "#000",
                  '&.Mui-disabled': {
                    bgcolor: theme.palette.primary.main,
                    color: "#000",
                  },
                }}
              >
                {loading ? "Registering..." : "Register"}
              </Button>

              {/* New Section: Already registered? Login */}
              <Box textAlign="center" mt={2}>
                <Typography variant="body2">
                  Already registered?{" "}
                  <Link href="/sign-in" underline="hover">
                    Login
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Card>
        </RightSection>
      </RegisterContainer>
      <Footer />
    </AppTheme>
  );
}
