// useSimulationLoop.ts (custom hook, calls pure logic)
import { useEffect } from 'react'
import { useSimulationStore } from '../../store/simulationStore'
import { processSimulationTick } from './simulationTick'

export function useSimulationLoop() {
  const {
    residents,
    totalTicks,
    setResidents,
    addTick,
    addActivityLogEntry,
    isRunning,
    tickRate,
  } = useSimulationStore()

  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      addTick()
      const updatedResidents = processSimulationTick(residents, totalTicks, addActivityLogEntry)
      setResidents(updatedResidents)
    }, tickRate)

    return () => clearInterval(interval)
  }, [isRunning, residents, totalTicks, tickRate, addTick, setResidents, addActivityLogEntry])
}
