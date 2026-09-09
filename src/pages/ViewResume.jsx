import { Box, Paper, Stack } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import Edit from '../components/Edit'
import { FaFileDownload } from "react-icons/fa";
import { TbPlayerTrackPrevFilled } from "react-icons/tb";
import { LuHistory } from "react-icons/lu";
import Preview from '../components/Preview';
import { getSingleResume } from '../services/allAPI';
import { useState } from 'react';
import html2canvas from 'html2canvas'
import jspdf from 'jspdf'
import { downloadResumeAPI } from '../services/allAPI';

function ViewResume() {
    const [resumeData, setResumeData] = useState({ skills: [] })
    console.log(resumeData);
    const previewRef = useRef() // returns a refernce object  , and the object contains a key called current.
    //useRef can be also used to store data
    const { id } = useParams()
    // console.log(id);
    useEffect(() => {
        getResumeDetails()
    }, [])

    const downloadResume = async () => {
        const previewTag = previewRef.current
        const canvas = await html2canvas(previewTag)
        //convert image url to short url
        canvas.toBlob(async (blob) => {
            const formdata = new FormData()
            formdata.append("file", blob)
            formdata.append("upload_preset", "my_preset")
            const res = await fetch("https://api.cloudinary.com/v1_1/fkhkm8yj/image/upload", {
                method: "POST",
                body: formdata

            })
            const data = await res.json()
            const short_url = data.secure_url
            console.log(short_url);
            generatePDF(short_url)

        })
    }

    const generatePDF = async (resumeImg) => {
        const today = new Date()
        const timestamp = `${today.toLocaleDateString()},${today.toLocaleTimeString()}`
        console.log(timestamp);
        const pdf = new jspdf()
        const imgwidth = pdf.internal.pageSize.getWidth()
        const imgheight = pdf.internal.pageSize.getHeight()
        pdf.addImage(resumeImg, "PNG", 0, 0, imgwidth, imgheight)

        const downloadDetails = {
            timestamp, resumeId: id, resumeImg, jobRole: resumeData.job
        }
        const response = await downloadResumeAPI(downloadDetails)
        console.log(response);
        if (response.status == 201) {
            pdf.save(`${resumeData.fullName}.pdf`)
        }

        pdf.save(`resume.pdf`)

    }
    const getResumeDetails = async () => {
        if (id) {
            const response = await getSingleResume(id)
            // console.log(response);
            setResumeData(response.data)

        }
    }

    return (
        <div className='container' style={{ marginTop: '60px' }}>
            <div className='row my-5'>
                <div className="col-lg-2"></div>
                <div className="col-lg-8">
                    <Stack direction={'row'} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                        {/* download */}
                        <button onClick={downloadResume} className='btn fs-2 text-danger'><FaFileDownload /></button>
                        {/* edit */}
                        <Edit resumeData={resumeData} setResumeData={setResumeData} />
                        {/* history */}
                        <Link to={'/history'} className='text-success fs-1 ms-1'><LuHistory /></Link>
                        {/* back */}
                        <Link to={'/userform'} className='text-primary fs-1 ms-1'><TbPlayerTrackPrevFilled /></Link>
                    </Stack>
                    <div className="d-flex align-items-center justify-content-center" ref={previewRef}>
                        <Preview resumeData={resumeData} />
                    </div>
                </div>
                <div className="col-lg-2">

                </div>

            </div>

        </div>
    )
}

export default ViewResume