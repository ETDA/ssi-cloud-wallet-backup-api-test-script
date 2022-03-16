export const toHex = (new_key: string) => {
  let s = unescape(encodeURIComponent(new_key))
  let h = ''
  for (let i = 0; i < new_key.length; i++) {
    h += s.charCodeAt(i).toString(16)
  }
  return h
}
