import '../../styles.css'
import { useEffect, useState } from 'react'
import { Chip, Container, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'

import EmojiEmotionsSharpIcon from '@mui/icons-material/EmojiEmotionsSharp'
import SentimentVeryDissatisfiedSharpIcon from '@mui/icons-material/SentimentVeryDissatisfiedSharp'
import SentimentNeutralSharpIcon from '@mui/icons-material/SentimentNeutralSharp'
import type { Resident } from '../../simulation/types/types'
import type { ResidentStatus } from '../../simulation/types/types'
import { useSimulationStore } from '../../store/simulationStore'
import { useResidentStore } from '../../store/residentStore'
import { useLogStore } from '../../store/logStore'

const headers = ['Resident', '🍕', '🥮', 'Actions', '🌾']

const mapStatusIcon = (status: ResidentStatus): React.ElementType | undefined => {
  if (status === 'thriving') return EmojiEmotionsSharpIcon
  if (status === 'deprived') return SentimentNeutralSharpIcon
  if (status === 'deceased') return SentimentVeryDissatisfiedSharpIcon
}

const RenderResidentChip = ({ resident }: { resident: Resident }) => {
  const trait = resident.behaviouralTrait
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

interface ResidentWithChanges {
  resident: Resident
  changes: Change[]
  lastTick: number
}
interface Change {
  consumables: number
  tokens: number
  sustenance: number
}

const ChangeBadge = ({ changeAmount }: { changeAmount: number }) => {
  return (
    <sup
      className={`text-xs ml-1 animate-fade-up`}
      style={{
        position: 'relative',
        visibility: changeAmount === 0 ? 'hidden' : 'visible',
        color: changeAmount > 0 ? 'green' : 'red',
        width: '1.25em', // Reserve enough space for 1-2 digits plus sign
        display: 'inline-block',
        textAlign: 'center',
      }}
    >
      {changeAmount > 0 ? `+${changeAmount}` : changeAmount}
    </sup>
  )
}

const FlashingTableCell = ({
  children,
  changes,
  align,
}: {
  children: React.ReactNode
  changes: Change[]
  align: 'left' | 'center' | 'right' | 'justify' | 'inherit' | undefined
}) => {
  const tickRate = useSimulationStore((state) => state.tickRate)
  const POSITIVE_COLOR = 'rgba(76, 175, 80, 0.4)' // Emerald
  const NEGATIVE_COLOR = 'rgba(244, 67, 54, 0.4)' // Classic red
  //const PRODUCE_COLOR = 'rgba(255, 193, 7, 0.5)' // Warm amber
  const NONVALUE_COLOR = 'rgba(5, 5, 5, 0.4)'
  const [activeColor, setActiveColor] = useState<string | null>(null)
  const [changeAmount, setChangeAmount] = useState<number>(0)

  useEffect(() => {
    if (!changes) {
      // If no changes, reset immediately
      setActiveColor(null)
      setChangeAmount(0)
      return
    }
    //console.log(changes)
    const flashes: string[] = []

    for (const change of changes) {
      for (const [_, value] of Object.entries(change)) {
        if (typeof value === 'number' && value !== 0) {
          flashes.push(value > 0 ? POSITIVE_COLOR : NEGATIVE_COLOR)
          setChangeAmount(value)
        }
      }
    }

    if (flashes.length === 0) {
      // Changes present, but all were zero → also reset
      setActiveColor(null)
      setChangeAmount(0)
      return
    }

    let i = 0
    setActiveColor(flashes[i])

    const interval = setInterval(() => {
      i++
      if (i >= flashes.length) {
        clearInterval(interval)
        setActiveColor(null) // reset to white/transparent
      } else {
        setActiveColor(flashes[i])
      }
    }, 500)

    return () => clearInterval(interval)
  }, [changes])

  return (
    <TableCell align={align} sx={{ position: 'relative' }}>
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 30,
          height: 30,
          borderRadius: '50%',
          background: activeColor || 'transparent',
          transition: `background-color 0.3s ease`,
        }}
      >
        {children}
      </span>

      <ChangeBadge changeAmount={changeAmount} />
    </TableCell>
  )
}

interface Props {
  children: React.ReactNode
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify'
}

interface Props {
  children: React.ReactNode
  shouldFlash: boolean
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify'
}

export const GreyFlashingCell: React.FC<Props> = ({ children, shouldFlash, align = 'center' }) => {
  const [flash, setFlash] = useState(false)

  useEffect(() => {
    if (shouldFlash) {
      setFlash(true)
      const timeout = setTimeout(() => setFlash(false), 300)
      return () => clearTimeout(timeout)
    }
  }, [shouldFlash])

  return (
    <TableCell
      align={align}
      sx={{
        minWidth: 1,
        backgroundColor: flash ? '#e0e0e0' : 'transparent',
        transition: 'background-color 0.3s ease-in-out',
      }}
    >
      {children}
      <ChangeBadge changeAmount={0} />
    </TableCell>
  )
}

const Community = () => {
  const tick = useSimulationStore((state) => state.totalTicks)
  const residents = useResidentStore((state) => state.residents)
  const activityLogEntries = useLogStore((state) => state.activityLogEntries)
  const [residentsWithChanges, setResidentsWithChanges] = useState<ResidentWithChanges[]>([])

  useEffect(() => {
    const lastTick = activityLogEntries[0]?.tick || 0
    const latestChanges = activityLogEntries.filter((entry) => entry.tick === lastTick && entry.changes)

    const residentsWithChanges: ResidentWithChanges[] = residents.map((resident) => {
      const changes = latestChanges
        .filter((entry) => entry.sourceId === resident.id)
        .map((entry) => ({
          consumables: entry.changes?.consumables || 0,
          tokens: entry.changes?.tokens || 0,
          sustenance: entry.changes?.sustenance || 0,
        }))
      return {
        resident,
        changes,
        lastTick,
      } as ResidentWithChanges
    })
    setResidentsWithChanges(residentsWithChanges)
    console.log('Changes by resident:', residentsWithChanges)
  }, [activityLogEntries, tick, residents])
  //console.log(residentsWithChanges)

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
            {residentsWithChanges.map((rwc, index) => {
              const isCurrentTick = index === rwc.lastTick % residentsWithChanges.length

              return (
                <TableRow key={rwc.resident.id}>
                  <TableCell align="left">
                    <RenderResidentChip resident={rwc.resident} />
                  </TableCell>

                  {rwc.changes.length < 1 ? (
                    <>
                      <GreyFlashingCell shouldFlash={isCurrentTick} align="center">
                        {rwc.resident.consumables}
                      </GreyFlashingCell>
                      <GreyFlashingCell shouldFlash={isCurrentTick} align="center">
                        {rwc.resident.tokens}
                      </GreyFlashingCell>
                      <GreyFlashingCell shouldFlash={isCurrentTick} align="center">
                        {rwc.resident.action}
                      </GreyFlashingCell>
                      <GreyFlashingCell shouldFlash={isCurrentTick} align="center">
                        {rwc.resident.sustenance}
                      </GreyFlashingCell>
                    </>
                  ) : (
                    <>
                      <FlashingTableCell
                        align="center"
                        changes={rwc.changes.map((c) => ({ consumables: c.consumables, tokens: 0, sustenance: 0 }))}
                      >
                        {rwc.resident.consumables}
                      </FlashingTableCell>
                      <FlashingTableCell
                        align="center"
                        changes={rwc.changes.map((c) => ({ tokens: c.tokens, consumables: 0, sustenance: 0 }))}
                      >
                        {rwc.resident.tokens}
                      </FlashingTableCell>
                      <TableCell align="center">{rwc.resident.action}</TableCell>
                      <FlashingTableCell
                        align="center"
                        changes={rwc.changes.map((c) => ({ sustenance: c.sustenance, consumables: 0, tokens: 0 }))}
                      >
                        {rwc.resident.sustenance}
                      </FlashingTableCell>
                    </>
                  )}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Container>
    </Paper>
  )
}

export default Community
