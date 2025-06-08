import { Chip, Container, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'

import EmojiEmotionsSharpIcon from '@mui/icons-material/EmojiEmotionsSharp'
import SentimentVeryDissatisfiedSharpIcon from '@mui/icons-material/SentimentVeryDissatisfiedSharp'
import SentimentNeutralSharpIcon from '@mui/icons-material/SentimentNeutralSharp'
import type { Resident } from '../../models/Resident'
import type { ResidentStatus } from '../../types/types'
import { useSimulationStore } from '../../store/simulationStore'

const headers = ['Resident', '🍕', '🥮', 'Occupation', '🌾', 'Actions']

interface CommunityProps {
  residents: Array<Resident>
}

const mapStatusIcon = (status: ResidentStatus): React.ElementType | undefined => {
  if (status === 'thriving') return EmojiEmotionsSharpIcon
  if (status === 'deprived') return SentimentNeutralSharpIcon
  if (status === 'deceased') return SentimentVeryDissatisfiedSharpIcon
}

const RenderResidentChip = ({ resident }: { resident: Resident }) => {
  const trait = resident._behaviouralTrait
  let traitMark = ''
  if (trait === 'inventor') traitMark = '⭐️'
  if (trait === 'risk-taker') traitMark = '🛠️'

  const Icon = mapStatusIcon(resident.status)
  return (
    <Chip
      sx={{ ml: 0 }}
      icon={Icon && <Icon color={resident.status === 'thriving' ? 'thriving' : ''} />}
      label={resident.name + ' ' + traitMark}
      disabled={resident.status === 'deceased'}
    />
  )
}

const Community = () => {
  //const setIsUpdating = useSimulationStore((state) => state.setIsUpdating)
  const residents = useSimulationStore((state) => state.residents)

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

          <TableBody>
            {residents.map((resident) => (
              <TableRow key={resident.name}>
                <TableCell align="left">
                  <RenderResidentChip resident={resident} />
                </TableCell>
                <TableCell align="center">{resident.consumable}</TableCell>
                <TableCell align="center">{resident.tokens}</TableCell>

                <TableCell align="center">{resident.occupation}</TableCell>

                <TableCell align="center">{resident.sustenance}</TableCell>
                <TableCell align="center">{resident.activity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </Paper>
  )
}

export default Community
