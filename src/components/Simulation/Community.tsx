import {
  Chip,
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

const headers = ['Resident', 'Occupation', 'Tokens', 'Actions']

const residentData = [
  {
    icon: EmojiEmotionsSharpIcon,
    name: 'John',
    status: 'thriving',
    occupation: 'owner',
    tokens: 100,
  },
  {
    icon: SentimentNeutralSharpIcon,
    name: 'Alice',
    status: 'deprived',
    occupation: 'employee',
    tokens: 50,
  },
  {
    icon: SentimentVeryDissatisfiedSharpIcon,
    name: 'Bob',
    status: 'deceased',
    occupation: 'unemployed',
    tokens: 75,
  },
]

const Community = () => {
  return (
    <Paper sx={{ mb: 2 }} elevation={2}>
      <Container sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          COMMUNITY
        </Typography>
        <Table aria-label="community-table" size="small">
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
              <TableRow key={resident.name}>
                <TableCell align="center">
                  <Chip
                    sx={{ minWidth: 80 }}
                    icon={<resident.icon />}
                    label={resident.name}
                  />
                </TableCell>
                <TableCell align="center">{resident.occupation}</TableCell>
                <TableCell align="center">{resident.tokens}</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </Paper>
  )
}

export default Community
