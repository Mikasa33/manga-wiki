import { UIcon } from '#components'

export function formatManga(data: any) {
  const { id, name, name_cn, images, infobox: infoBox, rating, summary, tags } = data
  return {
    id,
    to: `/manga/${id}`,
    name,
    nameCn: name_cn,
    covers: images,
    infoBox,
    chip: rating ? h('div', { class: 'text-yellow-500' }, `${rating.score}分`) : null,
    summary,
    tags: tags.map((item: any) => ({ label: item.name })),
  }
}

export function formatCharacter(data: any) {
  const { id, name, name_cn, images, relation, infobox: infoBox, gender, summary } = data
  return {
    id,
    to: `/character/${id}`,
    name,
    nameCn: name_cn || findInfoBox(infoBox, '简体中文名'),
    covers: images,
    infoBox,
    chip: gender
      ? h(UIcon, {
        name: gender === 'male' ? 'i-icon-park-outline-male' : 'i-icon-park-outline-female',
        class: gender === 'male' ? 'text-blue-500' : 'text-pink-500',
      })
      : null,
    summary,
    relation,
    tags: [],
  }
}

export function formatSubject(data: any) {
  const { id, name, name_cn, images, image } = data
  return {
    id,
    to: `/manga/${id}`,
    name,
    nameCn: name_cn,
    covers: images ?? { common: image },
  }
}

export function formatPerson(data: any) {
  const { id, name, name_cn, images, relation, infobox: infoBox, gender, summary } = data
  return {
    id,
    to: `/person/${id}`,
    name,
    nameCn: name_cn || findInfoBox(infoBox, '简体中文名'),
    covers: images,
    infoBox,
    chip: gender
      ? h(UIcon, {
        name: gender === 'male' ? 'i-icon-park-outline-male' : 'i-icon-park-outline-female',
        class: gender === 'male' ? 'text-blue-500' : 'text-pink-500',
      })
      : null,
    summary,
    relation,
    tags: [],
  }
}
