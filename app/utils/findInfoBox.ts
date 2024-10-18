interface InfoBox {
  key: string
  value: any
}

export default (data: InfoBox[], key: string) => {
  return data?.find(item => item.key === key)?.value || '未知'
}
