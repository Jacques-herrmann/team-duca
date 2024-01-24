const getRoutes = (locales = ['fr']) => {
  const routes = []
  for (const locale of locales) {

    routes.push(`/${locale}`)
    routes.push(`/${locale}/contact`)
    routes.push(`/${locale}/galerie`)
    routes.push(`/${locale}/inscription`)
    routes.push(`/${locale}/services`)
  }
  return routes
}
export default getRoutes