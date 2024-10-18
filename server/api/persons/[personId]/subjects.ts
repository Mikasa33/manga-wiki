export default defineEventHandler(async (event) => {
  const personId = getRouterParam(event, 'personId')
  return $fetch(`https://api.bgm.tv/v0/persons/${personId}/subjects`, {
    headers: {
      userAgent: 'Mikasa33/manga-wiki (https://github.com/Mikasa33/manga-wiki)',
    },
  })
})
