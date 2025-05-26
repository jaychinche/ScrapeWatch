import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import api from './api';
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  CssBaseline,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";

import AppTheme from "./shared-theme/AppTheme";
import AppAppBarUser from "./dashboardMain/components/AppAppBarUser";
import Footer from "./dashboardMain/components/Footer";

const DashboardContainer = styled(Stack)(({ theme }) => ({
  minHeight: "100vh",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  backgroundColor: theme.palette.background.default,
}));

const Card = styled(motion(Paper))(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: theme.spacing(3),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "1200px",
    padding: theme.spacing(4),
  },
  boxShadow: theme.shadows[4],
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
}));

const Sidebar = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: "100%",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[2],
  [theme.breakpoints.up("sm")]: {
    minWidth: 260,
    maxWidth: 320,
  },
}));

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [scrapeLoading, setScrapeLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState("success");

  const fetchNews = async (pageNum = 1) => {
    setLoading(true);
    try {
      const res = await api.get(
        `/api/news?page=${pageNum}&limit=5`
      );
      setNews(res.data.data);
      setPage(res.data.pagination.page);
      setTotalPages(res.data.pagination.pages);
      setAlertMessage(null);
    } catch (err) {
      console.error(err);
      setAlertMessage("Failed to fetch news. Please try again.");
      setAlertType("error");
    }
    setLoading(false);
  };

  const handleScrape = async () => {
    setScrapeLoading(true);
    setAlertMessage(null);
    try {
      const res = await api.post("/api/scrape");
      setAlertMessage(res.data.message || "Scraping complete.");
      setAlertType("success");
      await fetchNews();
    } catch (err) {
      console.error(err);
      setAlertMessage("Failed to scrape news.");
      setAlertType("error");
    }
    setScrapeLoading(false);
  };

  const handlePageChange = (event, newPage) => {
    fetchNews(newPage);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <AppAppBarUser />

      <Box sx={{ mt: 10 }}>
        <DashboardContainer direction="column">
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={4}
            justifyContent="center"
            alignItems="flex-start"
            sx={{ width: "100%", maxWidth: 1200, mx: "auto" }}
          >
            {/* Sidebar */}
            <Sidebar>
              <Typography variant="h5" gutterBottom fontWeight={600}>
                ScrapeWatch
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Get real-time news updates scraped from top sources. Click the
                button below to fetch the latest headlines.
              </Typography>

              <Box sx={{ textAlign: "center", position: "relative" }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    
                    onClick={handleScrape}
                   
                  >
                    {scrapeLoading ? (
                      <CircularProgress size={24} sx={{ color:"primary"}} />
                    ) : (
                      "Scrape Now"
                    )}
                  </Button>
                </motion.div>
              </Box>
            </Sidebar>

            {/* Main News Table */}
            <Card
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <TableContainer
                component={Paper}
                elevation={0}
                sx={{
                  borderRadius: 2,
                  mb: 4,
                  overflow: "auto",
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Table sx={{ minWidth: 650 }} aria-label="news table">
                  <TableHead sx={{ color:theme.palette.primary.main }}>
                    <TableRow>
                   
                      <TableCell sx={{ color:theme.palette.primary.main, fontWeight: 600 }}>
                        Title
                      </TableCell>
                      <TableCell sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>
                        Link
                      </TableCell>
                      <TableCell sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>
                        Published At
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={3} align="center" sx={{ py: 8 }}>
                          <CircularProgress />
                        </TableCell>
                      </TableRow>
                    ) : (
                      news.map((item) => (
                        <TableRow key={item._id} hover>
                          <TableCell>{item.title}</TableCell>
                          <TableCell>
                            <Button
                              href={item.link}
                              target="_blank"
                              rel="noreferrer"
                              variant="outlined"
                              size="small"
                              color="primary"
                            >
                              View
                            </Button>
                          </TableCell>
                          <TableCell>
                            {new Date(item.publishedAt).toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

              {!loading && (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                    sx={{
                      "& .MuiPaginationItem-root": {
                        fontSize: "1.1rem",
                      },
                    }}
                  />
                </Box>
              )}
            </Card>
          </Stack>
        </DashboardContainer>
        <Footer />
      </Box>
    </AppTheme>
  );
};

export default Dashboard;
