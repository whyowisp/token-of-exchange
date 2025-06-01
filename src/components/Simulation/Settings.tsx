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

  const enabledTaxes = useSimulationStore((state) => state.enabledTaxes)
  const setTaxEnabled = useSimulationStore((state) => state.setTaxEnabled)
  //const setTaxRate = useSimulationStore((state) => state.setTaxRate)
  //const taxRates = useSimulationStore((state) => state.taxRates)

  console.log('Enabled Taxes:', enabledTaxes)

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
                checked={enabledTaxes.get('flat') || false}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setTaxEnabled('flat', e.target.checked)
                }
              />
            }
            label="Flat Tax"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={enabledTaxes.get('progressive') || false}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setTaxEnabled('progressive', e.target.checked)
                }
              />
            }
            label="Progressive Tax"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={enabledTaxes.get('wealth') || false}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setTaxEnabled('wealth', e.target.checked)
                }
              />
            }
            label="Wealth Tax"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={enabledTaxes.get('consumption') || false}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setTaxEnabled('consumption', e.target.checked)
                }
              />
            }
            label="Consumption Tax"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={enabledTaxes.get('resource') || false}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setTaxEnabled('resource', e.target.checked)
                }
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
