export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const keywords = getRouterParam(event, 'keyword')
  return $fetch(`https://api.bgm.tv/search/subject/${keywords}`, {
    headers: {
      'User-Agent': 'Mikasa33/manga-wiki (https://github.com/Mikasa33/manga-wiki)',
    },
    query,
  })
})
