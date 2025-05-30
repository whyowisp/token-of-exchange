import React from 'react'
import { Container, Paper, Table, Typography } from '@mui/material'

const Residents = () => {
  return (
    <Paper sx={{ mb: 2 }}>
      <Container sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          RESIDENTS
        </Typography>
        <Table>
          <thead>
            <tr>
              <th>Resident ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>John Doe</td>
              <td>30</td>
              <td>Active</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jane Smith</td>
              <td>25</td>
              <td>Inactive</td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </Paper>
  )
}

export default Residents
