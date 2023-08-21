import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { Fragment, useCallback, useState } from 'react'
import Detail from './Detail'
// import EthLogo from 'assets/svg/eth_logo.svg'
// import LootLogo from 'assets/images/logo.png'
import Image from 'components/Image'
import { useActiveWeb3React } from 'hooks'
import { useTransferNFTHistoryList } from 'hooks/useTransferNFT'
import { ChainId, ChainListMap } from 'constants/chain'
import moment from 'moment'

export interface Props {
  timestamp: string
  nft: any
  fromChain: ChainId
  toChain: ChainId
  sentTx: string
  receivedTx: string
  name: string
  tokenId: number
}

function Row(props: { row: Props; onClick: () => void }) {
  const { row, onClick } = props

  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} onClick={onClick}>
        <TableCell>
          <Typography>{row.nft?.name || '--'}</Typography>
          <Typography>#{row.nft?.tokenId}</Typography>
        </TableCell>
        <TableCell align="center">
          <Image src={ChainListMap[row.fromChain || 1]?.logo || ''} width={26} height={26} />
        </TableCell>
        <TableCell align="center">
          <Image src={ChainListMap[row.toChain || 1]?.logo || ''} width={26} height={26} />
        </TableCell>
        <TableCell align="center">
          <Typography color={'#A5FFBE'}>
            {moment(Number(row.timestamp) * 1000).format('YYYY-MM-DD HH:mm:ss')}
          </Typography>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}

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
  const { account } = useActiveWeb3React()
  const { data: historyList } = useTransferNFTHistoryList(account || '')
  console.log(isEnteredDetail, tableIndex)
  const handleClick = useCallback((index: number) => {
    setTableIndex(index)
  }, [])

  return (
    <>
      {isEnteredDetail === true ? (
        <Detail detailData={historyList?.list[tableIndex]} setIsEnteredDetail={setIsEnteredDetail} />
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
              borderRadius: '10px'
              // height: 457
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
              verticalAlign: 'middle',
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
                maxHeight: '400px'
              }}
            >
              {historyList?.list?.map((row: any, index: number) => (
                <Row
                  key={row.txHash + index}
                  row={row}
                  onClick={() => {
                    handleClick(index)
                    setIsEnteredDetail(true)
                  }}
                />
              ))}
              {historyList?.list?.length === 0 ? (
                <Box
                  sx={{
                    width: '100%',
                    position: 'absolute',
                    top: '50%',
                    color: '#7FB093',
                    fontWeight: 600,
                    fontSize: 18,
                    textAlign: 'center',
                    backgroundColor: '#1a1e1b'
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
