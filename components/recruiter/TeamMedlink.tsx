import { Box, Card, Divider, Grid, Typography, CardMedia, IconButton } from '@mui/material';
import React from 'react';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Head from 'next/head';


const style = {
  color: '#395987',
  fontSize: '20px',
  mx: 1,
};

const teamData = [
  {
    name: 'Manoj Kumar Vaddepally',
    title: 'Founder, CEO - MedLink Healthcare',
    email: 'manoj@medlinkjobs.com',
    linkedIn: 'https://www.linkedin.com/in/manoj-kumar-vaddepally-96b42420/',
    description: 'Manoj Kumar Vaddepally has over 18 years of experience in software, marketing, and sales. Post-graduate and graduate of computer science who worked in information technology for a decade before launching his a few startups, he has extensive experience setting objectives, defining and driving key growth marketing strategies, and enabling/converging key partners to achieve success in the core business.<br /> <br />His aim is to bring an upswing in the healthcare recruitment in India by bringing technology very close to connect both healthcare job seekers and recruiters. Manoj enjoys spending time with his family and friends and watching cricket in his spare time.',
    image:"/assets/images/teamMedlink/manoj.jpg",
  },
  {
    name: 'Anirudh Golwalkar',
    title: 'Co-Founder and COO - MedLink Healthcare',
    email: 'anirudh@medlinkjobs.com',
    linkedIn: 'https://www.linkedin.com/in/anirudh-golwalkar-12280225/',
description: `Anirudh Golwalkar is a seasoned business professional with more than 12 years of experience in managing large technical and operational teams and executing multi-million dollar capex offshore and onshore oil and gas drilling projects.<br/><br/>Anirudh completed his B.Tech in Petroleum Engineering from Indian Institute of Technology (Indian School of Mines) – Dhanbad in 2008 and worked in the drilling engineering team of Cairn Oil and Gas, Vedanta limited for 12 years.In his last role, he was the drilling manager for offshore strategic business unit of the company.In 2021, Anirudh completed his Masters of Science in Management (MSx – 1-year full-time MBA for experienced professionals) from Stanford Graduate School of Business, US.With a mission to chart his entrepreneurial journey, Anirudh joined MedLink Health Care Pvt. Ltd. in 2022 as Co-Founder and COO.<br/><br/>In his spare time, Anirudh enjoys music and loves to spend time with his family.`,
    image: "/assets/images/teamMedlink/anirudh.jpg",
  },
  {
    name: 'Raj Vaddepally',
    title: 'Director - MedLink Healthcare',
    email: 'raj@medlinkjobs.com',
    linkedIn: 'https://www.linkedin.com/in/raj-vaddepally-md-59bb3a15/',
    description: 'Dr.Raj Vaddepally is an oncologist by profession and practices in Arizona, United States. He was instrumental in providing precision medicine to marginalized and unfortunate communities in southwestern Arizona with the utilization of tumor-specific genomic testing and the use of targeted therapy including state-of-the-art clinical trials designed to provide the best care ‘at home’ for the rural communities without the need to travel hundreds of miles for better care.<br/><br/>He implemented a ‘lung cancer screening program for high-risk smokers who are at substantially increased risk for lung cancer. He serves as president of the state oncology society (TACOS), executive member of immunotherapy institute for national community cancer centers association (ACCC) and the society of immunotherapy for cancers (SITC), and scientific review committee for the esteemed Mayo Clinic community cancer research (ACCRU). He shares his expertise in not only providing customized care to cancer patients but also providing education, advocacy, and research at the state and national levels with his involvement in various leadership roles. He has a great skillset in rolling out new programs that serve the community and provide holistic care.<br/><br/>He quickly realized the need for having an organized and seamless recruitment platform for healthcare professionals in India which has been quite a shortcoming in spite of the technological advancements India has seen over the last 2 decades. He shared his vision with the founders of the MedLink Team and took it to fruition in less than a year with the wonderful executive team members.',
    image: "/assets/images/teamMedlink/raj.jpg",
  },
];

const TeamCard = ({ person }) => (
  <Card
      sx={{
        p: 3,
        border: '1px solid #E4EEF5',
        borderRadius: '12px',
        boxShadow: '10px 40px 50px rgba(229, 233, 246, 0.4)',
        mb: 4,
      }}
    >
      <Grid container spacing={3} alignItems="center">
        {/* Image */}
        <Grid item xs={12} md={3} sx={{ textAlign: 'center' }}>
          <CardMedia
            component="img"
            image={person.image}
            alt={person.name}
            sx={{
              borderRadius: '50%',
            width:200,height:200,
              mx: 'auto',
            }}
          />
        </Grid>

        {/* Text Content */}
        <Grid item xs={12} md={9}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {person.name}{' '}
            <IconButton href={`mailto:${person.email}`}>
              <EmailIcon sx={{ fontSize: 20, color: '#395987' }} />
            </IconButton>
            <IconButton href={person.linkedIn} target="_blank" rel="noreferrer">
              <LinkedInIcon sx={{ fontSize: 20, color: '#395987' }} />
            </IconButton>
          </Typography>

          <Typography variant="subtitle2" sx={{ color: '#6F7482', mb: 2 }}>
            {person.title}
          </Typography>

          <Typography variant="body2" sx={{ color: '#6F7482', lineHeight: 1.6 }}>
             <p dangerouslySetInnerHTML={{ __html: person.description }}></p>
          </Typography>
        </Grid>
      </Grid>
    </Card>
);

const TeamMedlink = () => {
  return (
    <>
      <Head>
        <title>Meet Our Team | MedLink Jobs</title>
        <meta
          name="description"
          content="Meet the team behind MedLink Jobs and learn about their passion for healthcare recruitment. Join us and connect with industry experts today."
        />
      </Head>

      {/* Heading */}
      <Grid container justifyContent="center" sx={{ mt: 12 }}>
        <Grid item md={4} textAlign="center">
          <Typography variant="h1" sx={{ fontWeight: 700, fontSize: '32px', color: '#395987' }}>
            <span style={{ fontWeight: 500, color: '#6F7482' }}>Meet Our</span> Team
          </Typography>
          <Divider
            sx={{
              borderBottomWidth: '5px',
              backgroundColor: '#395987',
              width: '140px',
              mt: '10px',
              borderRadius: '10px',
              mx: 'auto',
            }}
          />
        </Grid>
      </Grid>

      {/* Subheading */}
      <Typography
        sx={{
          textAlign: 'center',
          fontSize: 24,
          fontWeight: 700,
          mt: 10,
          color: '#395987',
        }}
      >
        Founding Team
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Divider
          sx={{
            borderBottomWidth: '4px',
            backgroundColor: '#395987',
            width: '83px',
            mt: '10px',
            borderRadius: '30px',
          }}
        />
      </Box>

      {/* Team Cards */}
      <Grid container spacing={4} sx={{ my: 5, px: 2, justifyContent: 'center' }}>
        {teamData.map((member, index) => (
          <Grid item md={10} key={index}>
            <TeamCard person={member} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default TeamMedlink;
