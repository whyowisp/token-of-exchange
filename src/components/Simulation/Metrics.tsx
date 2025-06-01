import React from 'react'
import { BarChart, LineChart } from '@mui/x-charts'
import { Container, Paper, Stack, Typography } from '@mui/material'

const Metrics = () => {
  return (
    <Stack spacing={1}>
      <Paper sx={{ p: 2 }} elevation={2}>
        <Typography variant="h6" gutterBottom>
          GDP
        </Typography>
        <LineChart
          xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5, 5],
            },
          ]}
          height={300}
        />
      </Paper>
      <Paper sx={{ p: 2 }} elevation={2}>
        <Typography variant="h6" gutterBottom>
          TOKEN CIRCULATION VELOCITY
        </Typography>
        <BarChart
          xAxis={[
            {
              id: 'barCategories',
              data: ['bar A', 'bar B', 'bar C'],
            },
          ]}
          series={[
            {
              data: [2, 5, 3],
            },
          ]}
          height={300}
        />
      </Paper>
    </Stack>
  )
}

export default Metrics
