export default defineEventHandler(async (event) => {
  const characterId = getRouterParam(event, 'characterId')
  return $fetch(`https://api.bgm.tv/v0/characters/${characterId}`, {
    headers: {
      'User-Agent': 'Mikasa33/manga-wiki (https://github.com/Mikasa33/manga-wiki)',
    },
  })
})
