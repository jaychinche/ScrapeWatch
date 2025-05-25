import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';

function Copyright() {
  return (
    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
      {'Copyright © '}
      <Link color="text.secondary" href="#">
        ScrapeWatch
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 10 },
        textAlign: { sm: 'center', md: 'left' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ width: { xs: '100%', sm: '60%' } }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            ScrapeWatch
          </Typography>
          <Typography variant="body2" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
            Breaking News. Real Time.
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
            Stay ahead with instant updates on global headlines. ScrapeWatch delivers the latest breaking news through automated scraping and intelligent monitoring.
          </Typography>
          <InputLabel htmlFor="email-newsletter">Subscribe to News Alerts</InputLabel>
          <Stack direction="row" spacing={1} useFlexGap>
            <TextField
              id="email-newsletter"
              hiddenLabel
              size="small"
              variant="outlined"
              fullWidth
              placeholder="Your email address"
              sx={{ width: '250px' }}
            />
            <Button variant="contained" color="primary" size="small">
              Subscribe
            </Button>
          </Stack>
        </Box>
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexDirection: 'column', gap: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>Features</Typography>
          <Link color="text.secondary" variant="body2" href="#">Live News Scraping</Link>
          <Link color="text.secondary" variant="body2" href="#">Topic Monitoring</Link>
          <Link color="text.secondary" variant="body2" href="#">Custom Alerts</Link>
          <Link color="text.secondary" variant="body2" href="#">Smart Filtering</Link>
        </Box>
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexDirection: 'column', gap: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>Resources</Typography>
          <Link color="text.secondary" variant="body2" href="#">Documentation</Link>
          <Link color="text.secondary" variant="body2" href="#">API Access</Link>
          <Link color="text.secondary" variant="body2" href="#">Support</Link>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          pt: { xs: 4, sm: 8 },
          width: '100%',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <div>
          <Link color="text.secondary" variant="body2" href="#">Privacy Policy</Link>
          <Typography sx={{ display: 'inline', mx: 0.5, opacity: 0.5 }}>&nbsp;•&nbsp;</Typography>
          <Link color="text.secondary" variant="body2" href="#">Terms of Service</Link>
          <Copyright />
        </div>
        <Stack direction="row" spacing={1} useFlexGap sx={{ justifyContent: 'left', color: 'text.secondary' }}>
          <IconButton color="inherit" size="small" href="#" aria-label="GitHub">
            <GitHubIcon />
          </IconButton>
          <IconButton color="inherit" size="small" href="#" aria-label="X">
            <XIcon />
          </IconButton>
          <IconButton color="inherit" size="small" href="#" aria-label="LinkedIn">
            <LinkedInIcon />
          </IconButton>
        </Stack>
      </Box>
    </Container>
  );
}
