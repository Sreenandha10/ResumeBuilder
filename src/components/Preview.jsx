import React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { Button, Divider, Stack } from '@mui/material';
import { FaFileDownload } from 'react-icons/fa'
import { LuHistory} from 'react-icons/lu'
import { MdEditDocument } from 'react-icons/md'
import {TbPlayerTrackPrevFilled} from 'react-icons/tb'
import Edit from './Edit'; 

function Preview({resumeData}) {
  console.log(resumeData);
  
  return (

   <div>
    
    
     <Box component="section" >
      <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
        <h2>{resumeData.fullName}</h2>
        <h6>{resumeData.job}</h6>
        <p><span>{resumeData.location}</span>|<span>{resumeData.email}</span>|<span>{resumeData.phone}</span></p>

        <p><Link>{resumeData.github}</Link>|<Link>{resumeData.linkedIn}</Link></p>

        <Divider sx={{ fontSize: '23px', fontWeight: 'BOLD' }}>SUMMARY</Divider>

        <p>{resumeData.summary}</p>
        <Divider sx={{ fontSize: '23px', fontWeight: 'BOLD', marginBottom: '10px' }}>SKILLS</Divider>

        <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: '10px' }}>
          {
            resumeData?.skills?.map(skill=>(
            <Button variant="contained">{skill}</Button>
          ))
          }

        </Stack>

        <Divider sx={{ fontSize: '23px', fontWeight: 'BOLD' }}>EDUCATION</Divider>
        <h6>User Education</h6>
        <p><span>{resumeData.degree}</span>|
          <span>{resumeData.university}</span>|
          <span>{resumeData.passout}</span></p>

        {/* <Divider sx={{ fontSize: '23px', fontWeight: 'BOLD', marginBottom: '10px' }}>PROFESSIONAL EXPERIENCE</Divider>

        <h6>{resumeData.job}</h6>
        <p><span>{resumeData.company}</span>|
          <span>{resumeData.location}</span>|
          <span>{resumeData.duration}</span></p> */}

        
      </Paper>
    </Box>
   </div>
  )
}
export default Preview