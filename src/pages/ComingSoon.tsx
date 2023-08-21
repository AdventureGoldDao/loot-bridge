import { styled } from '@mui/material'
import { Dots } from 'theme/components'

const Frame = styled('div')(`
width: calc(100% - 40px);
max-width: 500px;
margin: 20px;
height: 280px;
box-sizing: border-box;
border-radius: 32px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
background-color: transparent;
`)

const Title = styled('p')(`
  color: #A5FFBE;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
`)

const SubTitle = styled('p')(`
  margin: 0;
  color: #7A9283;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
`)

export default function ComingSoon() {
  return (
    <Frame>
      <Title>
        Coming Soon <Dots />
      </Title>
      <SubTitle>This section is still implemeting.</SubTitle>
      <SubTitle>Please come back later</SubTitle>
    </Frame>
  )
}
