import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { Fragment, useCallback, useState } from 'react'
import Detail from './Detail'
import EthLogo from 'assets/svg/eth_logo.svg'
import LootLogo from 'assets/images/logo.png'

interface Props {
  timestamp: string
  txHash: string
  from: string
  to: string
  name: string
  tokenId: number
}

function Row(props: { row: Props; onClick: () => void }) {
  const { row, onClick } = props

  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} onClick={onClick}>
        <TableCell>
          <Typography>{row.name}</Typography>
          <Typography>#{row.tokenId}</Typography>
        </TableCell>
        <TableCell align="center">
          <Typography>{row.from}</Typography>
        </TableCell>
        <TableCell align="center">
          <Typography>{row.to}</Typography>
        </TableCell>
        <TableCell align="right">
          <Typography color={'#A5FFBE'}>{row.timestamp}</Typography>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}

export const rows: any = [
  {
    timestamp: '2023/05/24 00:00:00',
    from: 'Ethereum',
    to: 'Loot',
    fromLogo: EthLogo,
    toLogo: LootLogo,
    txHash: '0xe41f3de68a6d35925a91435f64bd8988afd330260545d5db1b18c839ec7a8501',
    name: 'Completed',
    tokenId: 0
  },
  {
    timestamp: '2023/05/24 00:00:00',
    from: 'Ethereum',
    to: 'Loot',
    fromLogo: EthLogo,
    toLogo: LootLogo,
    txHash: '0xe41f3de68a6d35925a91435f64bd8988afd330260545d5db1b18c839ec7a8501',
    name: 'Completed',
    tokenId: 1
  },
  {
    timestamp: '2023/05/24 00:00:00',
    from: 'Ethereum',
    to: 'Loot',
    fromLogo: EthLogo,
    toLogo: LootLogo,
    txHash: '0xe41f3de68a6d35925a91435f64bd8988afd330260545d5db1b18c839ec7a8501',
    name: 'Completed',
    tokenId: 2
  },
  {
    timestamp: '2023/05/24 00:00:00',
    from: 'Ethereum',
    to: 'Loot',
    fromLogo: EthLogo,
    toLogo: LootLogo,
    txHash: '0xe41f3de68a6d35925a91435f64bd8988afd330260545d5db1b18c839ec7a8501',
    name: 'Completed',
    tokenId: 3
  },
  {
    timestamp: '2023/05/24 00:00:00',
    from: 'Ethereum',
    to: 'Loot',
    fromLogo: EthLogo,
    toLogo: LootLogo,
    txHash: '0xe41f3de68a6d35925a91435f64bd8988afd330260545d5db1b18c839ec7a8501',
    name: 'Completed',
    tokenId: 4
  },
  {
    timestamp: '2023/05/24 00:00:00',
    from: 'Ethereum',
    to: 'Loot',
    fromLogo: EthLogo,
    toLogo: LootLogo,
    txHash: '0xe41f3de68a6d35925a91435f64bd8988afd330260545d5db1b18c839ec7a8501',
    name: 'Completed',
    tokenId: 5
  },
  {
    timestamp: '2023/05/24 00:00:00',
    from: 'Ethereum',
    to: 'Loot',
    fromLogo: EthLogo,
    toLogo: LootLogo,
    txHash: '0xe41f3de68a6d35925a91435f64bd8988afd330260545d5db1b18c839ec7a8501',
    name: 'Completed',
    tokenId: 6
  },
  {
    timestamp: '2023/05/24 00:00:00',
    from: 'Ethereum',
    to: 'Loot',
    fromLogo: EthLogo,
    toLogo: LootLogo,
    txHash: '0xe41f3de68a6d35925a91435f64bd8988afd330260545d5db1b18c839ec7a8501',
    name: 'Completed',
    tokenId: 7
  }
]

export default function TxHistory({
  // action,
  // setAction,
  isEnteredDetail,
  setIsEnteredDetail
}: {
  // action: ActionType
  // setAction: React.Dispatch<React.SetStateAction<ActionType>>
  isEnteredDetail: boolean
  setIsEnteredDetail: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [tableIndex, setTableIndex] = useState(-1)
  console.log(isEnteredDetail, tableIndex)
  const handleClick = useCallback((index: number) => {
    setTableIndex(index)
  }, [])

  return (
    <>
      {isEnteredDetail === true ? (
        <Detail detailData={rows[tableIndex]} setIsEnteredDetail={setIsEnteredDetail} />
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            maxWidth: 598,
            width: '100%',
            height: '87%',
            backgroundColor: 'transparent',
            borderRadius: '4px',
            overflow: 'auto',
            marginTop: 22,
            boxShadow: 'none',
            '&::-webkit-scrollbar': {
              display: 'none!important',
              width: 0
            },
            '& .MuiTable-root': {
              backgroundColor: '#1A1E1B',
              borderRadius: '10px',
              paddingBottom: 20
            },
            '& .MuiTableHead-root': {
              color: '#7FB093',
              fontSize: 16,
              lineHeight: '22px'
            },
            '& .MuiTableHead-root tr': {
              height: 55
            },
            '& .MuiTableRow-root': {
              width: '100%',
              height: 84,
              fontWeight: 400,
              fontSize: 14,
              cursor: 'pointer',
              borderRadius: '4px',
              '& th': {
                width: '20%',
                borderBottom: '1px solid #3C5141',
                backgroundColor: '#1A1E1B'
              }
            },
            '& .MuiTableRow-root:nth-of-type(2n)': {
              backgroundColor: '#151815'
            },
            '& .MuiTableBody-root': {
              position: 'relative',
              '& tr:nth-of-type(2n - 1)': {},
              '& tr:nth-of-type(2n)': {}
            },
            '& .MuiTableCell-root': {
              color: '#7FB093',
              border: 'none',
              borderImage: 'none'
            }
          }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell width={'25%'} align="left">
                  Items
                </TableCell>
                <TableCell width={'20%'} align="center">
                  From
                </TableCell>
                <TableCell width={'20%'} align="center">
                  To
                </TableCell>
                <TableCell sx={{ width: '35%!important' }} align="center">
                  Time
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody
              sx={{
                height: '400px'
              }}
            >
              {rows &&
                rows.map((row: any, index: number) => (
                  <Row
                    key={row.txHash + index}
                    row={row}
                    onClick={() => {
                      handleClick(index)
                      setIsEnteredDetail(true)
                    }}
                  />
                ))}
              {rows.length === 0 ? (
                <Box
                  sx={{
                    width: '100%',
                    position: 'absolute',
                    top: '50%',
                    color: '#7FB093',
                    fontWeight: 600,
                    fontSize: 18,
                    textAlign: 'center'
                  }}
                >
                  No Data
                </Box>
              ) : (
                ''
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  )
}
