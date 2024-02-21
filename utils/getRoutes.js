const getRoutes = (locales = ['fr']) => {
  const routes = []
  // for (const locale of locales) {

  routes.push(`/`)
  routes.push(`/contact`)
  routes.push(`/actualite`)
  routes.push(`/inscription`)
  routes.push(`/location-cage`)
  // }
  return routes
}
export default getRoutes