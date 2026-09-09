import { height, maxHeight } from '@mui/system'
import React from 'react'
import { Link } from 'react-router-dom'

function Landing() {
  return (
    <div>
      <section style={{ height: '500px', backgroundImage: "url('https://img.magnific.com/free-photo/business-meeting-office_1268-21523.jpg?semt=ais_test_b&w=740&q=80')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
        <div className='row' pt-5>
          <div className='col-12 col-md-4 '></div>
          <div className='col-12 col-md-12 mt-5'>
            <div className='text-center mt-5 border box-shadow p-5 rounded' style={{ backgroundColor: 'rgb(255,255,255,0.5)' }}>
              <h1 style={{ fontFamily: 'Dancing Script' }}>Designed to get hired.</h1>
              <h5>Your skills, your story, your next job -- all in one.</h5>
              {/* <a href="/resume" className='btn btn-dark'>MAKE YOUR RESUME</a> */}
              <Link to ={'/resume'}>MAKE YOUR RESUME</Link>
            </div>
            <div className='col-12 col-md-4'></div>
          </div>
        </div>
      </section>
      <section className='ms-3'>
        <div>
          <h1 className='text-center mt-3 mb-5' style={{ fontFamily: 'Dancing Script' }}>Tools</h1>
        </div>
        <div className='row mt-5 align-items-center'>
          <div className='col-md-6 align-items-center '>
            <h4>Resume</h4>
            <p>Create unlimited new resumes and easily edit them afterwards.</p>
            <h4>Cover Letters</h4>
            <p>Esily write professional cover letters.</p>
            <h4>Jobs</h4>
            <p>Automatically receive new and relevant job postings.</p>
            <h4>Applications</h4>
            <p>Effortlessly manage and track your job applications in an organized manner.</p>
          </div>
          <div className='col-md-6 d-flex justify-content-center'>
            <img src="https://cdn-images.zety.com/images/zety/landings/builder/resume-builder-jumbotron-image@3x.png" alt="" className="img-fluid" style={{
              maxWidth: "400px",
              width: "100%",
              height: "auto"
            }} />
          </div>
        </div>
      </section>
      <section className="w-100" >
        <img src="https://static.vecteezy.com/system/resources/thumbnails/049/584/351/small/confident-business-team-discussing-strategy-while-having-group-meeting-in-the-office-together-photo.jpg" alt="" className='w-100 object-fit-cover ' style={{ height: "500px" }} />
      </section>
      <section>
        <h1 style={{ fontFamily: 'Dancing Script' }} className='text-center mt-5'>Testimony</h1>
        <div className='row mt-5 align-items-center'>
          <div className='col-lg-6 ms-3 align-items-center'>
            <h2 className='mb-5 mt-5'>Trusted by professionals worldwide</h2>
            <p>At LiveCareer, we don't just help you create resumes - we help you land the job. Whether you're a seasoned professional or just starting out, our tools are designed to get results.</p>
            <p>In fact, users who used LiveCareer reported getting hired an average of 48 days faster.</p>
            <p>Join thousands of job seekers who've fast-tracked their careers with a resume that truly stands out.</p>
          </div>
          <div className='col-md-3 d-flex justify-content-center'>
            <img src="" alt="" className="img-fluid" style={{
              maxWidth: "400px",
              width: "100%",
              height: "auto"
            }} />
          </div>
          <div className='col-md-3 d-flex justify-content-center'>
            <img src="" alt="" className="img-fluid" style={{
              maxWidth: "400px",
              width: "100%",
              height: "auto"
            }} />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Landing
