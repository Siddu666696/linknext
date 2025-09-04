import { Box, Button, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React from 'react'

const ComingSoon = () => {
   const router = useRouter();
  return (
    <div>
       
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center",flexDirection:"column",p:1,my:8,gap:3  }}>
        <Image src={"/assets/images/commingsoonimg.svg"} alt={"folder"} width={400} height={400}/>
         <Typography color="#395987" fontSize={25} fontWeight={800}>Content Comming Soon</Typography>
        <Button variant="contained" onClick={() => router.back()}>
         Go Back
        </Button>
       
      </Box>
    </div>
  )
}

export default ComingSoon



