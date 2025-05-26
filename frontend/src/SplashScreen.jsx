import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, CircularProgress, CssBaseline } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import AppTheme from "./shared-theme/AppTheme";
import '@fontsource/orbitron/700.css';


const SplashScreen = () => {
  const theme = useTheme(); // ✅ Correct place
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/sign-in");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

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
    color: "#ffffff",
    marginTop: theme.spacing(2),
    fontSize: "2.5rem",
    letterSpacing: "1px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.8rem",
    },
  }));

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <SplashContainer>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
         
          <Typography
  variant="h4"
  gutterBottom
  fontWeight={700}
  sx={{
    fontFamily: "'Poppins', sans-serif",
    letterSpacing: "1.5px",
  
  }}
>
  ScrapeWatch
</Typography>
        </motion.div>

        <CircularProgress
          size={40}
          sx={{ mt: 4, color: theme.palette.primary.main }}
        />
      </SplashContainer>
    </AppTheme>
  );
};

export default SplashScreen;
