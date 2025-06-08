import { Toolbar, Box, Button, Slider, Typography } from '@mui/material'
import { useSimulationStore } from './simulationStore'

const ToolBar = () => {
  const isRunning = useSimulationStore((state) => state.isRunning)
  const tickRate = useSimulationStore((state) => state.tickRate)
  const setTickRate = useSimulationStore((state) => state.setTickRate)
  const totalTicks = useSimulationStore((state) => state.totalTicks)

  const start = useSimulationStore((state) => state.start)
  const stop = useSimulationStore((state) => state.stop)
  const reset = useSimulationStore((state) => state.reset)

  const residents = useSimulationStore((state) => state.residents)
  return (
    <Toolbar>
      <Box sx={{ flexGrow: 2, display: { xs: 'flex' } }}>
        <Button
          color="success"
          sx={{
            fontFamily: 'monospace',
            fontWeight: 700,
          }}
          onClick={() => start()}
        >
          Start
        </Button>
        <Button
          sx={{
            fontFamily: 'monospace',
            fontWeight: 700,
          }}
          onClick={() => stop()}
        >
          Stop
        </Button>
        <Button
          color="warning"
          sx={{
            fontFamily: 'monospace',
            fontWeight: 700,
          }}
          onClick={() => reset()}
        >
          Reset
        </Button>
        <Slider
          sx={{ width: 300, m: 1 }}
          value={tickRate}
          step={500}
          marks
          min={0}
          max={10000}
          valueLabelDisplay="auto"
          onChange={(_, newValue) => {
            stop()
            setTickRate(typeof newValue === 'number' ? newValue : newValue[0])
          }}
        />
        <Typography sx={{ m: 1, fontFamily: 'monospace' }}>
          Days: {Math.floor(totalTicks / residents.length || 0)}
        </Typography>
        <Typography
          variant="overline"
          color={isRunning ? 'inherit' : 'info'}
          sx={{
            m: 1,
            fontFamily: 'monospace',
            fontWeight: 800,
          }}
        >
          {isRunning ? 'Running' : 'Paused'}
        </Typography>
      </Box>
    </Toolbar>
  )
}

export default ToolBar
