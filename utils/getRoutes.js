import fetch from "node-fetch";

const getRoutes = async (locales = ['ar', 'ber', 'fr', 'en']) => {
    const routes = []
    for (const locale of locales) {
        routes.push(`/${locale}`)

        const pins = await fetch(`${process.env.API_URL}/api/pins?locale=${locale}`)
            .then((res) => res.json())
        pins?.docs?.forEach((item) => {
            routes.push(`/${locale}/${item?.slug}`)
        })
    }
    console.log(routes)
    return routes
}
export default getRoutes