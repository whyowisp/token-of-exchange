// useSimulationLoop.ts (custom hook, calls pure logic)
import { useEffect } from 'react'
import { useSimulationStore } from '../../store/simulationStore'
import { useCommunityStore } from '../../store/communityStore'
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
    naturalResources,
    residents,
    setResidents,
  } = useCommunityStore()
  const {
    addActivityLogEntry
  } = useLogStore()

  useEffect(() => {
    if (!isRunning) return

    console.log(naturalResources)
    console.log(residents)

    const interval = setInterval(() => {
      const updatedResidents = processSimulationTick(residents, totalTicks, addActivityLogEntry)
      setResidents(updatedResidents)
      addTick()
    }, tickRate)

    return () => clearInterval(interval)
  }, [isRunning, residents, totalTicks, tickRate, addTick, setResidents, addActivityLogEntry])
}
