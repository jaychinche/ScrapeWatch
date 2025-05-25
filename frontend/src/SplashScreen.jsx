import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, CircularProgress, CssBaseline } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import AppTheme from "./shared-theme/AppTheme";

const SplashContainer = styled(Box)(({ theme }) => ({
  height: "100vh",
  width: "100%",
  backgroundColor: theme.palette.background.default,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  padding: theme.spacing(4),
}));

const SplashText = styled(Typography)(({ theme }) => ({
  fontFamily: "'Poppins', sans-serif",
  fontWeight: 700,
  color: "#ffffff", // white color
  marginTop: theme.spacing(2),
  fontSize: "2.5rem",
  letterSpacing: "1px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.8rem",
  },
}));

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/sign-in");
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <SplashContainer>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* You can add a logo image here if desired */}
          <SplashText>ScrapeWatch</SplashText>
        </motion.div>

        <CircularProgress size={40} sx={{ mt: 4, color: "#ffffff" }} />
      </SplashContainer>
    </AppTheme>
  );
};

export default SplashScreen;
