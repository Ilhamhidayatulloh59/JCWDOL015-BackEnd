const base_url = process.env.BASE_URL_API || "http://localhost:8000/api"

export const getBlogs = async () => {
    const res = await fetch(`${base_url}/blogs`, { cache: 'no-cache' })
    const result = await res.json()

    return { result, blogs: result.blogs, ok: res.ok }
}

export const getBlogSlug = async (slug: string) => {
    const res = await fetch(`${base_url}/blogs/${slug}`, { next: {  revalidate: 3600 } })
    const result = await res.json()

    return { result, blog: result.blogs, ok: res.ok }
}