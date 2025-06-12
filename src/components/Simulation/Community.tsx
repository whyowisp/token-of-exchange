import { useEffect, useRef, useState } from 'react'
import { Chip, Container, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'

import EmojiEmotionsSharpIcon from '@mui/icons-material/EmojiEmotionsSharp'
import SentimentVeryDissatisfiedSharpIcon from '@mui/icons-material/SentimentVeryDissatisfiedSharp'
import SentimentNeutralSharpIcon from '@mui/icons-material/SentimentNeutralSharp'
import type { Resident } from '../../models/Resident'
import type { ResidentStatus } from '../../types/types'
import { useSimulationStore } from '../../store/simulationStore'

const headers = ['Resident', '🍕', '🥮', 'Actions', '🌾']

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

const CircleOfLight = ({ tokens, changed }: { tokens: number; changed: 'increased' | 'decreased' | 'neutral' }) => {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: 30,
        borderRadius: '50%',
        background:
          changed === 'increased'
            ? 'rgba(0, 255, 0, 0.2)'
            : changed === 'decreased'
            ? 'rgba(255, 0, 0, 0.2)'
            : 'rgba(128, 128, 128, 0.2)',
        color: 'white',
        fontSize: 13,
        transition: 'background-color 0.3s ease',
      }}
    >
      {tokens}
    </span>
  )
}

type FlashType = 'increasing' | 'neutral' | 'decreasing'

interface FlashFields {
  consumables: FlashType
  tokens: FlashType
  sustenance: FlashType
}

const Community = () => {
  const residents = useSimulationStore((state) => state.residents)
  const activityLogEntries = useSimulationStore((state) => state.activityLogEntries)
  const prevValues = useRef<{
    [key: string]: { tokens: number; consumables: number; sustenance: number }
  }>({})
  const [flashFieldsMap, setFlashFieldsMap] = useState<{ [key: number]: FlashFields }>({})

  useEffect(() => {
    const newFlashFields: { [key: number]: FlashFields } = {}
    const newPrevValues: {
      [key: string]: { tokens: number; consumables: number; sustenance: number }
    } = {}
    /*activityLogEntries.forEach((entry) => {
      console.log(
        `Resident ${residents.find((r) => r.id === entry.sourceId)?.name} at tick ${entry.tick}: Action: ${
          entry.action
        } changes:`,
        entry.changes
      )
    })*/
    residents.forEach((resident) => {
      const prevResident = prevValues.current[resident.id]

      if (!prevResident) {
        // Initialize new residents with neutral state
        newFlashFields[resident.id] = {
          consumables: 'neutral',
          tokens: 'neutral',
          sustenance: 'neutral',
        }

        // Set the previous values to current, to avoid false change detection
        newPrevValues[resident.id] = {
          tokens: resident.tokens,
          consumables: resident.consumables,
          sustenance: resident.sustenance,
        }
      } else {
        // Compare with previous values
        newFlashFields[resident.id] = {
          consumables: getChangeState(resident.consumables, prevResident.consumables),
          tokens: getChangeState(resident.tokens, prevResident.tokens),
          sustenance: getChangeState(resident.sustenance, prevResident.sustenance),
        }

        // Store current values for next comparison
        newPrevValues[resident.id] = {
          tokens: resident.tokens,
          consumables: resident.consumables,
          sustenance: resident.sustenance,
        }
      }

      /*console.log(`Resident ${resident.id} comparison:`, {
        current: {
          tokens: resident.tokens,
          consumable: resident.consumables,
          sustenance: resident.sustenance,
        },
        previous: prevResident,
      })*/
    })

    // Update previous values after all comparisons are done
    prevValues.current = newPrevValues

    // Update flash fields
    setFlashFieldsMap(newFlashFields)

    const timer = setTimeout(() => {
      setFlashFieldsMap({})
    }, 1000)

    return () => clearTimeout(timer)
  }, [residents])

  const getChangeState = (current: number, previous: number): FlashType => {
    if (current > previous) return 'increasing'
    if (current < previous) return 'decreasing'
    return 'neutral'
  }

  // Helper to determine cell style
  const getCellStyle = (residentId: number, field: 'tokens' | 'consumables' | 'sustenance') => ({
    color: flashFieldsMap[residentId]?.[field] ? 'green' : 'inherit',
    transition: 'color 0.3s ease',
  })

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
                <TableCell align="center" sx={getCellStyle(resident.id, 'consumables')}>
                  {resident.consumables}
                </TableCell>
                <TableCell align="center" sx={getCellStyle(resident.id, 'tokens')}>
                  {resident.tokens}
                </TableCell>
                <TableCell align="center">{resident.activity}</TableCell>
                <TableCell align="center" sx={getCellStyle(resident.id, 'sustenance')}>
                  {resident.sustenance}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </Paper>
  )
}

export default Community
