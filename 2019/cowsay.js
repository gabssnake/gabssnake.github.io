let bbl = [
  [`.-`, `-`, `-.`],
  [`| `, ` `, ` |`],
  [`'-`, `-`, `-'`]
]

let tiny = `\
\   ,__,
 \  (oo)____
    (__)    )\\
       ||--|| *
`

function cowsay(txt, cow = tiny, [top, mid, bot] = bbl, wth = 34) {
  // It’s easier to work with an array of lines.
  let cut = s => s.split('\n')

  // We might need to force word wraps after nth chars.
  let wrp = (s, n) => s.replace(RegExp(`([^\\n]{1,${n}})(\\s|$)`, 'g'), '$1\n').trim()

  // We need to know the longest line to size the bubble and stuff.
  let max = ls => [...ls].sort((a, b) => b.length - a.length).shift().length

  // All rows of the bubble are built in the same way: decor + text + pad + decor.
  let fmt = ([l, m, r], lng, ls = ['']) => ls.map(ln => l + ln.padEnd(lng, m) + r)

  // We want to center cows relative to the speech bubble.
  let pad = (ls, lng) => ls.map(ln => ln.padEnd(max(ls), ' ')).map(ln => ln.padStart(lng, ' '))

  // Array.prototype.flat ponyfill.
  let flt = arr => [].concat(...arr)

  let ls = cut(wrp(txt, wth))

  return flt([
    fmt(top, max(ls)),
    fmt(mid, max(ls), ls),
    fmt(bot, max(ls)),
    pad(cut(cow), max(ls) - max(cut(cow)))
  ]).join('\n')
}
