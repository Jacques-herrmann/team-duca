const toRad = Math.PI / 180

function sphericalToCartesian(r, t, p) {
    return {
        x: r * Math.sin(p) * Math.cos(t),
        y: r * Math.sin(p) * Math.sin(t),
        z: r * Math.cos(p)
    }
}

function clamp(n, min, max) {
    return Math.min(Math.max(n, min), max)
}

function distance(x1, y1, x2, y2) {
    const x = x2 - x1
    const y = y2 - y1
    return Math.abs(Math.sqrt(x * x + y * y))
}

function smoothstep(min, max, value) {
    const x = clamp((value - min) / (max - min), 0.0, 1.0)
    return x * x * (3 - 2 * x)
}

function easeInOut(t) {
    return t > 0.5 ? 4 * Math.pow((t - 1), 3) + 1 : 4 * Math.pow(t, 3);
}

function easeIn(t) {
    return Math.pow(t, 2);
}

export {
    toRad,
    sphericalToCartesian,
    clamp,
    distance,
    smoothstep,
    easeIn,
    easeInOut
}
