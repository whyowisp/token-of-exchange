import { useState, type ChangeEvent } from 'react'
import type {
  SimulationStore,
  BankingMode,
  GovernanceMode,
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

  const governanceMode = useSimulationStore((state) => state.governanceMode)
  const setGovernanceMode = useSimulationStore(
    (state) => state.setGovernanceMode
  )

  const taxSettings = useSimulationStore((state) => state.taxSettings)
  const setTaxConfig = useSimulationStore((state) => state.setTaxConfig)

  console.log('Enabled Taxes:', taxSettings)

  return (
    <Paper sx={{ mb: 2 }} elevation={2}>
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
              value="elder-autocratic"
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
            control={
              <Checkbox
                checked={taxSettings.get('flat')?.enabled ?? false}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setTaxConfig('flat', {
                    enabled: e.target.checked,
                  })
                }}
              />
            }
            label="Flat Tax"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={taxSettings.get('progressive')?.enabled ?? false}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setTaxConfig('progressive', {
                    enabled: e.target.checked,
                  })
                }}
              />
            }
            label="Progressive Tax"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={taxSettings.get('wealth')?.enabled ?? false}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setTaxConfig('wealth', {
                    enabled: e.target.checked,
                  })
                }}
              />
            }
            label="Wealth Tax"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={taxSettings.get('consumption')?.enabled ?? false}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setTaxConfig('consumption', {
                    enabled: e.target.checked,
                  })
                }}
              />
            }
            label="Consumption Tax"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={taxSettings.get('resource')?.enabled ?? false}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setTaxConfig('resource', {
                    enabled: e.target.checked,
                  })
                }}
              />
            }
            label="Resource Tax"
          />
        </FormControl>
      </Container>
    </Paper>
  )
}

export default Settings
