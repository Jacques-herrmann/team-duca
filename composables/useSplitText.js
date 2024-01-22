const useSplitText = () => {
    const mergeByLine = (lines) => {
        let top, line
        const linesMerged = []
        Array.from(lines).forEach((l, i) => {
            if (l.offsetTop !== top) {
                top = l.offsetTop
                line = document.createElement('div')
                line.style.overflow = 'hidden'
                const span = document.createElement('span')
                span.innerText = l.innerText
                span.style.display = 'block'
                span.style.opacity = '0'
                span.style.paddingBottom = '0.68rem'
                line.appendChild(span)
                linesMerged.push(line)
            } else {
                line.children[0].innerText += l.innerText
            }
        })
        return linesMerged
    }
    const split = (container, text, cb) => {
        let letters = text.split("");
        let spans = letters.map(letter => `<span>${letter}</span>`);

        container.value.innerHTML = spans.join("");

        setTimeout(() => {
            container.value.replaceChildren(...mergeByLine(container.value.children))
            if (cb) cb()
        }, 800)

    }
    return {
        split
    }
}

export default useSplitText