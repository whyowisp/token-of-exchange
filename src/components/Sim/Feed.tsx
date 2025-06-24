import type { ActivityLogEntry } from '../../simulation/types/types'
import { Box, ListItem, ListItemText, Paper, Typography } from '@mui/material'
import { FixedSizeList } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import { useResidentStore } from '../../store/residentStore'
import { useLogStore } from '../../store/logStore'

interface RowProps {
  index: number
  style: React.CSSProperties
  data: { grouped: { tick: number; entries: ActivityLogEntry[] }[] }
}

const renderRow = ({ index, style, data }: RowProps) => {
  const { grouped } = data
  const { tick, entries } = grouped[index]
  const residents = useResidentStore.getState().residents

  return (
    <ListItem style={{ ...style, alignItems: 'flex-start' }} key={tick} divider>
      <ListItemText
        primary={
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            Tick {tick}
          </Typography>
        }
        secondary={
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            {entries.map((entry, i) => {
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
                <Typography variant="body2" key={i} sx={{ whiteSpace: 'normal' }}>
                  {`${actionLabel} – ${actorName}${targetName ? ' → ' + targetName : ''}${
                    changeSummary ? ' | ' + changeSummary : ''
                  }${extraMessage ? ' | ' + extraMessage : ''}`}
                </Typography>
              )
            })}
          </Box>
        }
      />
    </ListItem>
  )
}

function groupEntriesByTick(entries: ActivityLogEntry[]) {
  const grouped: { tick: number; entries: ActivityLogEntry[] }[] = []

  const map = new Map<number, ActivityLogEntry[]>()

  for (const entry of entries) {
    if (!map.has(entry.tick)) map.set(entry.tick, [])
    map.get(entry.tick)!.push(entry)
  }

  for (const [tick, entries] of [...map.entries()].sort((a, b) => b[0] - a[0])) {
    grouped.push({ tick, entries })
  }

  return grouped
}

const Feed = () => {
  const activityLogEntries = useLogStore((state) => state.activityLogEntries)
  //const residents = useResidentStore((state) => state.residents)
  const grouped = groupEntriesByTick(activityLogEntries)

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
              itemSize={200}
              itemCount={grouped.length}
              itemData={{ grouped }}
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
