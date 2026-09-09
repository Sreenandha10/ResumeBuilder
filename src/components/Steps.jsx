import React from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import jobTypes from "../assets/jobRole.json";
import jobSkills from "../assets/jobSkills.json";
import summaries from "../assets/summaries.json";
import { addResumeAPI } from '../services/allAPI';
import { useNavigate } from 'react-router-dom';

const steps = ['Basic Information', 'Contact Details', 'Education Details', 'Review & Submit'];
function Steps({ resumeData, setResumeData }) {


    const [activeStep, setActiveStep] = React.useState(0);
    const navigate = useNavigate()

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const generateAI = () => {
        setResumeData({
            ...resumeData, skills: jobSkills[resumeData.job],
            summary: summaries[resumeData.job]
        })
        handleNext()
    }

    const addResume = async () => {
        // first check user filled all fields otherwise give alert to fill all fields
        const { fullName, job, location, email, phone, github, linkedIn, degree, university, passout, skills, summary } = resumeData  // destructed data using keys
        if (fullName && job && location && email && phone && github && linkedIn && degree && university && passout && skills.length && summary) {
            // reqBody is the data to be passed to the server that is stored in resumeData
            const response = await addResumeAPI(resumeData)
            console.log(response);
            if (response.status == 201) {
                alert("Resume Generated Successfully")
                let resumeId = response.data.id
                navigate(`/resume/${resumeId}/view`)
            }
        }
        else {
            alert('fill the fields completely')
        }
    }

    const previousActiveStepRef = React.useRef(activeStep);
    const resetButtonRef = React.useRef(null);
    const nextButtonRef = React.useRef(null);
    //render the content corresponding to array index
    const renderStepArrayContent = (stepCount) => {
        switch (stepCount) {
            case 0: return (
                <div className='mt-3'>
                    <h3>Personal Details</h3>
                    <div className='mt-3'>
                        <div>
                            <TextField value={resumeData.fullName} onChange={(e) => setResumeData({ ...resumeData, fullName: e.target.value })} id="standard-name" label="Full Name" variant="standard" className='w-100' ></TextField>
                        </div>
                        <FormControl variant="standard" className='w-100'>
                            <InputLabel id="demo-simple-select-standard-label">Choose Job Title</InputLabel>
                            <Select onChange={(e) => setResumeData({ ...resumeData, job: e.target.value })} labelId="demo-simple-select-standard-label" id="demo-simple-select-standard">
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

            )
            case 1: return (
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

            )

            case 2: return (
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

            )

            default: return null
        }
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};


                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={addResume} ref={resetButtonRef}>
                            Finish
                        </Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
                    {/* view of each step */}
                    <Box>
                        {renderStepArrayContent(activeStep)}
                    </Box>




                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />


                        {
                            activeStep === steps.length - 1 ?
                                <Button onClick={generateAI} >Generate Skill & Summary</Button>
                                :
                                <Button onClick={handleNext}>Next</Button>
                        }

                    </Box>
                </React.Fragment>
            )}
        </Box>
    );

}

export default Steps