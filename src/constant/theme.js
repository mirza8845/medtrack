import { Dimensions } from "react-native"

const {width, height} = Dimensions.get("window");

export const COLORS = {
    Primary:'#0EBE7F',
    secondary:'#FFFFFF',
    primeText:'#333333',
    secText:'#677294'
}

export const SIZES = {
    base:10,
    width,
    height
}

const theme = {COLORS, SIZES};
export default theme;