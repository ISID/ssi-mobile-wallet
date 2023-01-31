import { FC } from 'react'
import { ColorValue, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'

import { fonts } from '../../../../styles/colors'

export interface IProps {
  size?: number
  color?: ColorValue
}

const SSIEyeIcon: FC<IProps> = (props: IProps): JSX.Element => {
  const { size = 15, color = fonts.light } = props

  return (
    <View style={{ width: size, aspectRatio: 1 }}>
      <Svg width="100%" height="100%" viewBox="0 0 15 15" fill="none">
        <Path
          d="M7.50028 3.39288C4.5959 3.39288 2.01889 4.92865 0.418981 7.29681C0.378963 7.35517 0.357422 7.42534 0.357422 7.49735C0.357422 7.56936 0.378963 7.63954 0.418981 7.6979C2.01889 10.0661 4.5959 11.6072 7.50028 11.6072C10.4047 11.6072 12.9817 10.0661 14.5816 7.6979C14.6216 7.63954 14.6431 7.56936 14.6431 7.49735C14.6431 7.42534 14.6216 7.35517 14.5816 7.29681C12.9817 4.92865 10.4047 3.39288 7.50028 3.39288ZM7.50028 4.07741C10.1023 4.07741 12.4085 5.41789 13.9019 7.50003C12.4084 9.58077 10.1013 10.9226 7.50028 10.9226C4.89929 10.9226 2.59215 9.58077 1.0987 7.50003C2.59209 5.41789 4.89826 4.07741 7.50028 4.07741ZM7.50028 5.10419C6.24905 5.10419 5.22777 6.18089 5.22777 7.50003C5.22777 8.81916 6.24905 9.89586 7.50028 9.89586C8.75151 9.89586 9.77279 8.81916 9.77279 7.50003C9.77279 6.18089 8.75151 5.10419 7.50028 5.10419ZM7.50028 5.78872C8.40061 5.78872 9.1235 6.55084 9.1235 7.50003C9.1235 8.4492 8.40061 9.21134 7.50028 9.21134C6.59995 9.21134 5.87706 8.4492 5.87706 7.50003C5.87706 6.55084 6.59995 5.78872 7.50028 5.78872Z"
          fill={color}
        />
      </Svg>
    </View>
  )
}

export default SSIEyeIcon
