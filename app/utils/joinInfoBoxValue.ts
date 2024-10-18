interface InfoBoxValue {
  v?: any
}

export default (value: InfoBoxValue[] | any, joiner: string = ', ') => {
  if (isArray(value)) {
    return useJoin(useMap(value, 'v'), joiner)
  }
  return value
}
