import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Box } from 'grommet'

const WideBox = styled(Box)`
  min-width: 100%;
  min-height: 10em;
`

const StandardBox = styled(Box)`
  min-height: 10em;
`

const LargeMessageBox = function ({
  children,
  flex,
  wide,
}) {
  const MessageBox = (wide) ? WideBox : StandardBox
  
  return (
    <MessageBox
      align='center'
      background='#e5e5e5'
      flex={flex}
      justify='center'
      pad='small'
      round='xsmall'
      size='medium'
    >
      {children}
    </MessageBox>
  )
}

LargeMessageBox.propTypes = {
  flex: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
    PropTypes.string,
  ]),
  wide: PropTypes.bool,
}

LargeMessageBox.defaultProps = {
  flex: 'grow',
  wide: true,
}

export default LargeMessageBox
