import React from 'react';
import { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { MdEditDocument } from 'react-icons/md';
import jobTypes from "../assets/jobRole.json";
import { editResumeAPI } from '../services/allAPI';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  maxHeight: '80vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Edit({ resumeData, setResumeData }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const skillRef = useRef()

  const removeSkill = (skill) => {
    setResumeData({ ...resumeData, skills: resumeData?.skills?.filter(item => item != skill) })
  }

  const addSkill = (skill) => {
    if (skill) {
      if (resumeData?.skills?.map(item => item.toLowerCase()).includes(skill.toLowerCase())) {
        alert("Given skill is already available! please add another one")
      }
      else {
        setResumeData({ ...resumeData, skills: [...resumeData?.skills, skill] })
      }
      skillRef.current.value = ""
    }
    else {
      alert("enter a valid skill")
    }
  }
  const editResume = async () => {

    const { fullName, job, location, email, phone, github, linkedIn, degree, university, passout, skills, summary } = resumeData
    if (fullName && job && location && email && phone && github && linkedIn && degree && university && passout && skills.length && summary) {
      const response = await editResumeAPI(resumeData?.id, resumeData)
      console.log(response);
      if (response.status == 200) {
        alert("Resume updated Successfully")
        handleClose()
      }
    }
    else {
      alert('fill the fields completely')
    }
  }
  return (
    <>
      <button onClick={handleOpen} className='btn fs-1 text-warning'><MdEditDocument /></button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Details
          </Typography>
          <Typography component="div" id="modal-modal-description" sx={{ mt: 2 }}>
            <div className='mt-3'>
              <h3>Personal Details</h3>
              <div className='mt-3'>
                <div>
                  <TextField value={resumeData.fullName} onChange={(e) => setResumeData({ ...resumeData, fullName: e.target.value })} id="standard-name" label="Full Name" variant="standard" className='w-100' ></TextField>
                </div>
                <FormControl variant="standard" className='w-100'>
                  <InputLabel id="demo-simple-select-standard-label">Choose Job Title</InputLabel>
                  <Select value={resumeData?.job} onChange={(e) => setResumeData({ ...resumeData, job: e.target.value })} labelId="demo-simple-select-standard-label" id="demo-simple-select-standard">
                    {
                      jobTypes.jobRoles.map(role => (
                        <MenuItem key={role} value={role} > {role}</MenuItem>
                      ))
                    }

                  </Select>
                </FormControl>

                <div>
                  <TextField value={resumeData.location} onChange={(e) => setResumeData({ ...resumeData, location: e.target.value })} id="standard-loc" label="Location" variant="standard" className='w-100' ></TextField>
                </div>
              </div>
            </div>

            <div className='mt-3'>
              <h3>Contact Details</h3>
              <div className='mt-3'>
                <div>
                  <TextField value={resumeData.email} onChange={(e) => setResumeData({ ...resumeData, email: e.target.value })} id="standard-email" label="Email" variant="standard" className='w-100' ></TextField>
                </div>
                <div>
                  <TextField value={resumeData.phone} onChange={(e) => setResumeData({ ...resumeData, phone: e.target.value })} id="standard-ph" label="Phone" variant="standard" className='w-100' ></TextField>
                </div>
                <div>
                  <TextField value={resumeData.github} onChange={(e) => setResumeData({ ...resumeData, github: e.target.value })} id="standard-github" label="Github Link" variant="standard" className='w-100' ></TextField>
                </div>
                <div>
                  <TextField value={resumeData.linkedIn} onChange={(e) => setResumeData({ ...resumeData, linkedIn: e.target.value })} id="standard-linkedin" label="LinkedIn Link" variant="standard" className='w-100' ></TextField>
                </div>
              </div>
            </div>

            <div className='mt-3'>
              <h3>Education Details</h3>
              <div className='mt-3'>
                <div>
                  <TextField value={resumeData.degree} onChange={(e) => setResumeData({ ...resumeData, degree: e.target.value })} id="standard-course" label="Bachelor's Degree" variant="standard" className='w-100' ></TextField>
                </div>
                <div>
                  <TextField value={resumeData.university} onChange={(e) => setResumeData({ ...resumeData, university: e.target.value })} id="standard-clg" label="College/University" variant="standard" className='w-100' ></TextField>
                </div>
                <div>
                  <TextField value={resumeData.passout} onChange={(e) => setResumeData({ ...resumeData, passout: e.target.value })} id="standard-poy" label="Passout Year" variant="standard" className='w-100' ></TextField>
                </div>
              </div>
            </div>

            <div className='mt-3'>
              <h3>Skills</h3>
              <div className='my-3 d-flex align-items-center'>
                <input
                  id="outlined-skill"
                  placeholder="Add Skill"
                  ref={skillRef}
                  className="form-control"
                />
                <Button onClick={() => addSkill(skillRef.current.value)} variant="contained" className="m-3" sx={{ backgroundColor: "blue" }}>ADD</Button>
              </div>


              <h5>Added Skills :</h5>
              <div className='d-flex my-3 flex-wrap justify-content-between'>
                {
                  resumeData?.skills?.map(skill => (
                    <span key={skill} className='btn btn-dark m-1 d-flex align-items-center'>{skill} <button className='btn text-light' onClick={() => removeSkill(skill)}>✖</button></span>
                  ))

                }

              </div>

            </div>

            <div className='mt-3'>
              <h3>Professional Summary</h3>
              <div className='mt-3'>
                <div>
                  <TextField value={resumeData?.summary} id="standard-summary" label="write a short professional summary of yourself" variant="standard" className='w-100' multiline rows={4} defaultValue={'Versatile and results-driven Full Stack Web Developer with 5+ years of experience designing, developing, and deploying scalable web applications. Proficient in both front-end and back-end technologies, including React, Angular, Node.j5, Express, and MongoDB. Adept at creating responsive user interfaces, RESTful APIs, and integrating third-party services. Strong understanding of software development life cycle, agile methodologies, and version control (Git).Passionate about building high-performance, user-centric solutions that solve real-world problems.'} onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })} />
                </div>
              </div>
            </div>
          </Typography>
          <Button className='w-100'
            variant="contained"
            sx={{ backgroundColor: "blue" }}
            onClick={editResume}
          >
            UPDATE
          </Button>
        </Box>
      </Modal >
    </>
  )
}

export default Edit

