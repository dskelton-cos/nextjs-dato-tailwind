import { getPreviewPageBySlug } from '../../lib/api'

export default async function preview(req, res) {
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (
    req.query.secret !== process.env.DATOCMS_PREVIEW_SECRET ||
    !req.query.permalink
  ) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  // Fetch the headless CMS to check if the provided `permalink` exists
  const page = await getPreviewPageBySlug(req.query.permalink)

  // If the permalink doesn't exist prevent preview mode from being enabled
  if (!page) {
    return res.status(401).json({ message: 'Invalid permalink' })
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({})

  // Redirect to the path from the fetched page
  // We don't redirect to req.query.permalink as that might lead to open redirect vulnerabilities
  res.writeHead(307, { Location: `/${page.permalink}` })
  res.end()
}