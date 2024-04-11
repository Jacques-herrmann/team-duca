import {Color} from "three";

const lighter = (color, value) => {
    if (typeof color === 'string') {
        color = new Color(color)
    }
    color.offsetHSL(0, 0, -value)
    return color

}

export {
    lighter
}