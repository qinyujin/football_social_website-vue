import defaultSettings from '@/settings'

const title = defaultSettings.title || '爱球网'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
