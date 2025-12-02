import * as React from "react"
import Svg, { SvgProps, Path, Rect } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    className="ionicon"
    viewBox="0 0 512 512"
    {...props}
  >
    <Path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={42}
      d="M336 208v-95a80 80 0 0 0-160 0v95"
    />
    <Rect
      width={320}
      height={272}
      x={96}
      y={208}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={42}
      rx={48}
      ry={48}
    />
  </Svg>
)
export default SvgComponent
