import React, { useEffect, useState } from 'react'
import { Md10K } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { MdDelete } from 'react-icons/md'
import { Box, Paper } from '@mui/material';
import { deleteHistoryAPI, getHistoryAPI } from '../services/allAPI';


function History() {
  const [downloads, setDownloads] = useState([])
  useEffect(() => {
    getDownloads()
  }, [])
  const getDownloads = async () => {
    const response = await getHistoryAPI()
    console.log(response);
    setDownloads(response.data)

  }

  const removeHistory = async (id) =>{
    await deleteHistoryAPI(id)
    console.log(removeHistory);
    getDownloads()
  }
  return (
    <div>
      <h1 className='text-center text-danger ' style={{ marginTop: '100px' }}>Download Resumes</h1>
      <Link to={'/'} className='float-end' style={{ marginTop: '-40px', marginRight: '20px' }}>Back</Link>
      <Box component="section" className='container-fluid'>
        <div className='row'>
          {
            downloads?.length > 0 ?
              downloads?.map(dwnld => (
                <div className='col-md-4 mb-5' style={{height:'500px'}}>
                  <Paper elevation={3} sx={{ my: 5, p: 5, textAlign: 'center' }}>
                    <div className='d-flex align-items-center justify-content-between'>
                      <h5>Review At:{dwnld.timestamp}</h5>
                      <button onClick={()=>removeHistory(dwnld.id)} className='btn text-danger fs-4'><MdDelete /></button>
                    </div>
                    <div>
                      {/* preview */}
                      <Link to={`resume/${dwnld.resumeId}/view`}></Link>
                      <img src={dwnld.resumeImg} className='img-fluid' alt="" />
                    </div>
                  </Paper>
                </div>
              ))
              :
              <p className='text-center text-danger fw-bold my-5'>No Resume Downloaded Yet</p>
          }
        </div>
      </Box>
    </div>
  )
}

export default History
