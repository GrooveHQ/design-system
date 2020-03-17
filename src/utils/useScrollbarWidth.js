// NOTE (jscheel): This isn't _technically_ a hook, but it looks like one for
// convenience. Ideally, we could use useMemo, and invalidate the check if
// anything has changed (like plugging a mouse in on MacOS), but that's not
// possible to detect yet.

let width

export default function() {
  if (width === undefined) {
    const el = document.createElement('div')
    el.style.width = '100px'
    el.style.height = '100px'
    el.style.overflow = 'scroll'
    el.style.position = 'absolute'
    el.style.top = '-9999px'
    el.style.left = '-9999px'
    el.style.visibility = 'hidden'
    document.body.appendChild(el)
    width = el.offsetWidth - el.clientWidth
    document.body.removeChild(el)
  }
  return width
}
