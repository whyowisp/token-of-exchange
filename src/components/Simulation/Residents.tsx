import React from 'react'
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'

import EmojiEmotionsSharpIcon from '@mui/icons-material/EmojiEmotionsSharp'
import SentimentVeryDissatisfiedSharpIcon from '@mui/icons-material/SentimentVeryDissatisfiedSharp'
import SentimentNeutralSharpIcon from '@mui/icons-material/SentimentNeutralSharp'

const headers = [
  'Icon',
  'Resident',
  'Occupation',
  'Needs',
  'Tokens',
  'Assets',
  'Actions',
]

const residentData = [
  {
    icon: EmojiEmotionsSharpIcon,
    name: 'John Doe',
    occupation: 'Farmer',
    needs: 'Food, Water',
    tokens: 100,
    assets: 'Land, Tools',
    action: 'Resident 4 ➜ Resident 7',
  },
  {
    icon: SentimentVeryDissatisfiedSharpIcon,
    name: 'Jane Smith',
    occupation: 'Engineer',
    needs: 'Shelter, Tools',
    tokens: 150,
    assets: 'House, Equipment',
    action: 'Resident 5 ➜ Resident 8',
  },
  {
    icon: SentimentNeutralSharpIcon,
    name: 'Alice Johnson',
    occupation: 'Teacher',
    needs: 'Books, Supplies',
    tokens: 200,
    assets: 'School, Materials',
    action: 'Resident 6 ➜ Resident 9',
  },
]

const Residents = () => {
  return (
    <Paper sx={{ mb: 2 }} elevation={2}>
      <Container sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          COMMUNITY
        </Typography>
        <Table ari-label="residents table" size="small">
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell key={header} align="center">
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {/* Table body would go here, e.g. mapping over residents data */}
          <TableBody>
            {residentData.map((resident, index) => (
              <TableRow key={index}>
                <TableCell align="center">
                  <resident.icon />
                </TableCell>
                <TableCell align="center">{resident.name}</TableCell>
                <TableCell align="center">{resident.occupation}</TableCell>
                <TableCell align="center">{resident.needs}</TableCell>
                <TableCell align="center">{resident.tokens}</TableCell>
                <TableCell align="center">{resident.assets}</TableCell>
                <TableCell align="center">{resident.action}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </Paper>
  )
}

export default Residents
