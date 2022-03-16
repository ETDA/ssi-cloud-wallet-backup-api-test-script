export const useTest = async <T> (run: Function, expect: (res: T) => void, middleware?: (res: T) => T) => {
  const res = await run()
  if (middleware) {
    await middleware(res)
    expect(res)
  } else {
    expect(res)
  }

  return res
}
