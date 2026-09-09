import React from 'react'
import { IoDocumentText } from 'react-icons/io5'
import { IoIosDownload } from 'react-icons/io'
import { Link } from 'react-router-dom'

function ResumeGenerator() {
  return (
    <div className='container-fluid'>
      <h2 className='text-center mt-5' style={{ marginTop: '100px' }}>Create a job-winning Resume in minutes</h2>
      <div style={{ height: '60vh' }} className='row justify-content-center align-items-center mt-5'>
        <div className="col-4 border shadow p-5 text-center ">
          <IoDocumentText className='fs-1 mb-3' />
          <h4>Add Your information</h4>
          <p>Add pre-written examples to each section</p>
          <h5>Step1</h5>
        </div>
        <div className="col-1"></div>
        <div className="col-4 border shadow p-5 text-center">
          <IoIosDownload className='fs-1 mb-3'/>
          <h4>Download Your resume</h4>
          <p>Download and start applying</p>
          <h5>Step2</h5>
        </div>
      </div>
      <div className='text-center mb-5'>
        <Link to={'/form'} className='btn btn-dark'>LET'S START</Link>
      </div>

    </div>
  )
}
export default ResumeGenerator