import React from 'react';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import { useNavigate } from 'react-router-dom';

const PressnMedia = () => {

  const openInNewTab = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Box sx={{ my: 9}}>
      <Box
        sx={{
          mx: 2,
          display: { xs: 'flex', md: 'none' },
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <ArrowBackIcon
          sx={{ color: '#6F7482', position: 'absolute' }}
          onClick={() => navigate(-1)}
        />
        <Typography
          variant="h6"
          sx={{
            margin: 'auto',
            fontWeight: 700,
            fontSize: { xs: '18px' },
            color: '#6F7482',
            lineHeight: '24px',
            textAlign: 'center',
          }}
        >
          Press and Media
        </Typography>
      </Box>

      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          justifyContent: 'center',
          mt: 1,
        }}
      >
        <Divider
          sx={{
            borderBottomWidth: '4px',
            backgroundColor: '#395987',
            width: '97px',
            borderRadius: '30px',
          }}
        />
      </Box>
      <Grid
        container
        spacing={3}
        sx={{ mt: 5, px: { xs: 2, md: 6 } }}
        justifyContent="center"
      >
        <Grid item xs={12} sx={{ display: { xs: 'none', md: 'block' } }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, fontSize: '32px', color: '#6F7482', textAlign: 'center' }}
          >
            Press and Media
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Divider
              sx={{
                borderBottomWidth: '5px',
                borderRadius: '30px',
                backgroundColor: '#395987',
                width: '140px',
                mt: 1,
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: 700, fontSize: { xs: 18, md: 24 }, color: '#000000' }}
          >
            Meet MedLink – India’s 1st Online Healthcare Recruitment Portal – Business Standard
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 400,
              fontSize: { xs: 16, md: 20 },
              color: '#000000',
              mt: 2,
              lineHeight: 1.6,
            }}
          >
            MedLink, a newly launched seed funded web enterprise, is a one-of-a-kind recruitment
            platform exclusively targeted towards medical and healthcare professionals.
          </Typography>
          <Button
            onClick={() =>
              openInNewTab(
                'https://www.business-standard.com/content/press-releases-ani/meet-medlink-india-s-first-online-healthcare-recruitment-portal-122110701492_1.html'
              )
            }
            variant="contained"
            fullWidth={true}
            sx={{
              mt: 4,
              borderRadius: 50,
              width: { xs: '100%', md: 300 },
            }}
          >
            <Typography sx={{ fontSize: '16px', fontWeight: 400, lineHeight: 1.5, color:"white"}}>
              Read 
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ width: '100%', maxWidth: { md: '80%', lg: '70%' }, mx: 'auto' }}>
            <a
              href="https://www.business-standard.com/content/press-releases-ani/meet-medlink-india-s-first-online-healthcare-recruitment-portal-122110701492_1.html"
              target="_blank"
              rel="noreferrer"
            >
              <img
                width="100%"
                src="/assets/images/teamMedlink/medlinkinnews.jpg"
                alt="medlinkinnews"
                style={{ borderRadius: '8px' }}
              />
            </a>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PressnMedia;
