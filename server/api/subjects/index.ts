export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  return $fetch('https://api.bgm.tv/v0/subjects', {
    query,
  })
})
