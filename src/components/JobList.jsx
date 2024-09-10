import React, { useState } from 'react'
import jobList from "../assets/json/jobs.json"
import Cards from './Cards'
import { Pagination, Stack, Typography } from '@mui/material';

function JobList() {
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 12;

  const indexOfLast = currentPage * jobsPerPage;
  const indexOfFirst = indexOfLast - jobsPerPage;
  const currentJobs = jobList.jobs.slice(indexOfFirst, indexOfLast)

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  }

  return (
    <>
      <div className="jobsCont">
        {currentJobs.map((job) => (
          <>
            <Cards
              key={job.id}
              title={job.title}
              description={job.description}
              tags={job.skills}
              id={job.id}
              city={job.city}
              postedDate={job.postedDate}
              salaryLow={job.salaryLow}
              salaryHigh={job.salaryHigh}
              yrsXPExpected={job.yrsXPExpected}
              active={job.active}
              remote={job.remote}
            />
          </>
        ))}
      </div>

      <div className="pagCont">
        <Stack spacing={2} sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px', color: 'white' }}>
          <Typography>Page: {currentPage}</Typography>
          <Pagination
            count={Math.ceil(jobList.jobs.length / jobsPerPage)}
            showFirstButton showLastButton
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="large"
          />
        </Stack>
      </div >
    </>
  )
}

export default JobList