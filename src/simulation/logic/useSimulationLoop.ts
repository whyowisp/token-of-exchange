// useSimulationLoop.ts (custom hook, calls pure logic)
import { useEffect } from 'react'
import { useSimulationStore } from '../../store/simulationStore'
import { useResidentStore } from '../../store/residentStore'
import { useLogStore } from '../../store/logStore'
import { processSimulationTick } from './simulationTick'

export function useSimulationLoop() {
  const {
    totalTicks,
    addTick,
    isRunning,
    tickRate,
  } = useSimulationStore()
  const {
    residents,
    setResidents,
  } = useResidentStore()
  const {
    addActivityLogEntry
  } = useLogStore()

  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      const updatedResidents = processSimulationTick(residents, totalTicks, addActivityLogEntry)
      setResidents(updatedResidents)
      addTick()
    }, tickRate)

    return () => clearInterval(interval)
  }, [isRunning, residents, totalTicks, tickRate, addTick, setResidents, addActivityLogEntry])
}
