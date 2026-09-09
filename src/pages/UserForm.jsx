import React from 'react'
import Preview from '../components/Preview'
import Steps from '../components/Steps'
import { useState } from 'react'

function UserForm() {
  const [resumeData, setResumeData] = useState({
          fullName: "",
          job: "",
          location: '',
          email: "",
          phone: "",
          github: "",
          linkedIn: '',
          degree: '',
          university: '',
          passout: '',
          skills: [],
          summary: ""
  
      })
  return (
    <div className='container-fluid mt-5'>
      <div className='row p-5'>
        <div className='col-lg-6'>
          <Steps setResumeData={setResumeData} resumeData={resumeData}  /> 
        </div>
        <div className='col-1'></div>
        <div className='col-lg-5'>
          {
          resumeData.fullName && <Preview resumeData={resumeData} />
          }
        </div>
      </div>
    </div>
  )
}

export default UserForm
