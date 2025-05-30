import {
  Box,
  Container,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material'
import { FixedSizeList, FixedSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import { theme } from '../../styles/theme'

interface RowProps {
  index: number
  style: React.CSSProperties
}

const renderRow = ({ index, style }: RowProps) => {
  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemText primary={`Item ${index + 1}`} />
      </ListItemButton>
    </ListItem>
  )
}

const Feed = () => {
  return (
    <Paper>
      <Typography variant="h6" gutterBottom>
        FEED
      </Typography>
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          bgcolor: 'Background.default',
        }}
      >
        <AutoSizer>
          {({ height, width }) => (
            <FixedSizeList
              height={height}
              width={width}
              itemSize={40}
              itemCount={200}
              overscanCount={5}
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
