const getRoutes = (locales = ['fr']) => {
  const routes = []
  for (const locale of locales) {

    routes.push(`/${locale}`)
    routes.push(`/${locale}/contact`)
    routes.push(`/${locale}/actualite`)
    routes.push(`/${locale}/inscription`)
    routes.push(`/${locale}/location-cage`)
  }
  return routes
}
export default getRoutes