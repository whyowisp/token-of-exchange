import { useState, type ChangeEvent } from 'react'
import type {
  SimulationStore,
  BankingMode,
  GovernanceMode,
  TaxationMode,
} from '../../types/types'
import { Checkbox } from '@mui/material'
import { useSimulationStore } from './simulationStore'
import {
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material'

const Settings = () => {
  const bankingMode = useSimulationStore((state) => state.bankingMode)
  const setBankingMode = useSimulationStore((state) => state.setBankingMode)
  console.log('Banking mode:', bankingMode)

  const governanceMode = useSimulationStore((state) => state.governanceMode)
  const setGovernanceMode = useSimulationStore(
    (state) => state.setGovernanceMode
  )
  console.log('Governance model:', governanceMode)

  const [checked, setChecked] = useState<boolean>(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
    console.log('Checkbox changed:', event.target.value)
  }

  return (
    <Paper sx={{ mb: 2 }}>
      <Container sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          SIMULATION SETTINGS
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <FormControl>
          <FormLabel id="banking-radio-btn">Banking Systems</FormLabel>
          <RadioGroup
            row
            aria-labelledby="banking-radio-btn"
            name="banking-mode"
            value={bankingMode}
            onChange={(e) => setBankingMode(e.target.value as BankingMode)}
          >
            <FormControlLabel
              value="gold-standard"
              control={<Radio />}
              label="Gold Standard"
            />
            <FormControlLabel value="fiat" control={<Radio />} label="Fiat" />
            <FormControlLabel
              value="crypto-like"
              control={<Radio />}
              label="Crypto-like"
            />
            <FormControlLabel
              value="government-issued"
              control={<Radio />}
              label="Government-issued"
            />
          </RadioGroup>
        </FormControl>
        <Divider sx={{ marginBottom: 2 }} />
        <FormControl>
          <FormLabel id="governance-radio-btn">Governance Model</FormLabel>
          <RadioGroup
            row
            aria-labelledby="governance-radio-btn"
            name="governance-mode"
            value={governanceMode}
            onChange={(e) =>
              setGovernanceMode(e.target.value as GovernanceMode)
            }
          >
            <FormControlLabel
              value="elder autocratic"
              control={<Radio />}
              label="Elder Autocratic"
            />
            <FormControlLabel
              value="trader-led"
              control={<Radio />}
              label="Trader-led"
            />
            <FormControlLabel
              value="council"
              control={<Radio />}
              label="Council"
            />
          </RadioGroup>
        </FormControl>
        <Divider sx={{ marginBottom: 2 }} />
        <FormControl>
          <FormLabel id="taxation-checkbox">Taxation</FormLabel>
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={handleChange} />}
            value="flat-tax"
            label="Flat Tax"
          />
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={handleChange} />}
            value="progressive-tax"
            label="Progressive Tax"
          />
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={handleChange} />}
            value="wealth-tax"
            label="Wealth Tax"
          />
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={handleChange} />}
            value="consuption-tax"
            label="Consumption Tax"
          />
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={handleChange} />}
            value="resource-tax"
            label="Resource Tax"
          />
        </FormControl>
      </Container>
    </Paper>
  )
}

export default Settings
