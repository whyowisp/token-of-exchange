import { Box, ListItem, ListItemText, Paper, Typography } from '@mui/material'
import { FixedSizeList } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import { useSimulationStore } from '../../store/simulationStore'
import type { ActivityLogEntry, Resident } from '../../simulation/types/types'

interface RowProps {
  index: number
  style: React.CSSProperties
  data: {
    entries: ActivityLogEntry[]
    residents: Resident[]
  }
}

const renderRow = ({ index, style, data }: RowProps) => {
  const residents = useSimulationStore.getState().residents
  const entry = data.entries[index]
  if (!entry) return null

  const actorName = residents.find((r) => r.id === entry.sourceId)?.name ?? `#${entry.sourceId}`
  const targetName = entry.targetId
    ? residents.find((r) => r.id === entry.targetId)?.name ?? `#${entry.targetId}`
    : null

  const actionLabel = entry.action.toUpperCase()
  const changeSummary = Object.entries(entry.changes || {})
    .map(([key, value]) => `${key}: ${value}`)
    .join(', ')

  const extraMessage = entry.message ?? ''

  return (
    <ListItem key={index} style={style} divider>
      <ListItemText
        primary={`${actionLabel} – ${actorName}${targetName ? ' → ' + targetName : ''}`}
        secondary={`Tick: ${entry.tick}${changeSummary ? ' | ' + changeSummary : ''}${
          extraMessage ? ' | ' + extraMessage : ''
        }`}
      />
    </ListItem>
  )
}

const Feed = () => {
  const activityLogEntries = useSimulationStore((state) => state.activityLogEntries)
  const residents = useSimulationStore((state) => state.residents)

  return (
    <Paper sx={{ p: 2 }} elevation={2}>
      <Typography variant="h6" gutterBottom>
        FEED
      </Typography>
      <Box
        sx={{
          width: '100%',
          height: '80vh',
          bgcolor: 'background.default',
        }}
      >
        <AutoSizer>
          {({ height, width }) => (
            <FixedSizeList
              height={height}
              width={width}
              itemSize={96}
              itemCount={activityLogEntries.length}
              itemData={{
                entries: activityLogEntries,
                residents,
              }}
            >
              {renderRow}
            </FixedSizeList>
          )}
        </AutoSizer>
      </Box>
    </Paper>
  )
}

export default Feed
