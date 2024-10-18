export default defineEventHandler(async (event) => {
  const mangaId = getRouterParam(event, 'mangaId')
  return $fetch(`https://api.bgm.tv/v0/subjects/${mangaId}/characters`)
})
