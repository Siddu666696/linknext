"use client"
import React from 'react'
import RecruiterProfile from './RecruiterProfile'
import CompanyProfile from './CompanyProfile'
import { Box } from '@mui/material'

const CompanySettings = () => {
  return (
    <div>
      <Box sx={{overflowY:"auto",width:"100%"}}>
    <RecruiterProfile/>
    <CompanyProfile />  
    </Box>
    </div>
  )
}

export default CompanySettings
