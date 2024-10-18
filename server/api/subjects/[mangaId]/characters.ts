export default defineEventHandler(async (event) => {
  const mangaId = getRouterParam(event, 'mangaId')
  return $fetch(`https://api.bgm.tv/v0/subjects/${mangaId}/characters`, {
    headers: {
      'User-Agent': 'Mikasa33/manga-wiki (https://github.com/Mikasa33/manga-wiki)',
    },
  })
})
