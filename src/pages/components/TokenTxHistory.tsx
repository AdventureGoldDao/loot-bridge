import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { Fragment, useCallback, useState } from 'react'
import { useActiveWeb3React } from 'hooks'
import { useTransferErc20HistoryList } from 'hooks/useTransferNFT'
import { ChainId, ChainListMap } from 'constants/chain'
import moment from 'moment'
import Erc20Detail from './Erc20Detail'
import { CurrencyAmount } from 'constants/token'
import { useToken } from 'state/wallet/hooks'

export interface Erc20Props {
  timeStamp: string
  amount: string
  fromChain: ChainId
  ftAddress: string
  toChain: ChainId
  sentTx: string
  receivedTx: string
  name: string
  tokenId: number
}

function Row(props: { row: Erc20Props; onClick: () => void }) {
  const { row, onClick } = props
  const token = useToken(row.ftAddress, row.fromChain)

  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} onClick={onClick}>
        <TableCell>
          <Typography>{moment(Number(row.timeStamp) * 1000).format('YYYY-MM-DD HH:mm:ss')}</Typography>
        </TableCell>
        <TableCell>
          <Typography textAlign={'center'}>
            {token && CurrencyAmount.fromRawAmount(token, row.amount).toSignificant()} {token && token.symbol}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography>{ChainListMap[row.fromChain || 1]?.name || ''}</Typography>
        </TableCell>
        <TableCell align="center">
          <Typography>{ChainListMap[row.toChain || 1]?.name || ''}</Typography>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}

export default function TokenTxHistory({
  isEnteredDetail,
  setIsEnteredDetail
}: {
  isEnteredDetail: boolean
  setIsEnteredDetail: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [tableIndex, setTableIndex] = useState(-1)
  const { account } = useActiveWeb3React()
  const { data: historyList } = useTransferErc20HistoryList(account || '')
  console.log('history', isEnteredDetail, tableIndex, historyList?.list)
  const handleClick = useCallback((index: number) => {
    setTableIndex(index)
  }, [])

  return (
    <>
      {isEnteredDetail === true ? (
        <Erc20Detail detailData={historyList?.list[tableIndex]} setIsEnteredDetail={setIsEnteredDetail} />
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
                <TableCell width={'30%'} align="left">
                  Time
                </TableCell>
                <TableCell width={'30%'} align="center">
                  Amount
                </TableCell>
                <TableCell width={'20%'} align="center">
                  From
                </TableCell>
                <TableCell sx={{ width: '20%' }} align="center">
                  To
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
                  key={row.timestamp + index}
                  row={row}
                  onClick={() => {
                    handleClick(index)
                    setIsEnteredDetail(true)
                  }}
                />
              ))}
              {historyList?.list?.length === 0 || !historyList ? (
                <Box
                  sx={{
                    width: '100%',
                    height: 390,
                    position: 'absolute',
                    top: '50%',
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#1a1e1b',
                    '& p': {
                      color: '#7FB093',
                      fontWeight: 600,
                      fontSize: 18
                    }
                  }}
                >
                  <Typography>No Data</Typography>
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
