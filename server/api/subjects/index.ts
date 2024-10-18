export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  return $fetch('https://api.bgm.tv/v0/subjects', {
    headers: {
      'User-Agent': 'Mikasa33/manga-wiki (https://github.com/Mikasa33/manga-wiki)',
    },
    query,
  })
})
