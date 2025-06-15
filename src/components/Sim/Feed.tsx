import { Box, Divider, ListItem, ListItemText, Paper, Typography } from '@mui/material'
import { FixedSizeList, FixedSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import { useResidentFeedStore } from '../../store/residentFeedStore'

interface RowProps {
  index: number
  style: React.CSSProperties
  data: { residentFeed: { residentId: string; message: string }[] }
}

const renderRow = ({ index, style, data }: RowProps) => {
  const feed = data.residentFeed[index]
  if (!feed) return null
  return (
    <ListItem dense style={style} key={feed.residentId} disablePadding>
      <ListItemText primary={feed.message} />
    </ListItem>
  )
}

const Feed = () => {
  const residentFeed = useResidentFeedStore((state) => state.feed)

  return (
    <Paper sx={{ p: 2 }} elevation={2}>
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
              itemCount={residentFeed.length}
              overscanCount={5}
              itemData={{
                residentFeed: residentFeed.map((feed) => ({
                  ...feed,
                  residentId: String(feed.residentId),
                })),
              }}
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
