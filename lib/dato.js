const NEXT_DATOCMS_API_TOKEN = process.env['NEXT_DATOCMS_API_TOKEN'];
const API_URL = 'https://graphql.datocms.com';

import { responsiveImageFragment } from './fragments.js';


async function fetchAPI(query, { variables, preview } = {}) {
  const res = await fetch(API_URL + (preview ? '/preview' : ''), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${NEXT_DATOCMS_API_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return json.data
}

export async function getPreviewPageBySlug(permalink) {
  const data = await fetchAPI(
    `query PageBySlug($permalink: String) {
      page(filter: {permalink: {eq: $permalink}}) {
        permalink
      }
    }`,
    {
      preview: true,
      variables: {
        permalink,
      },
    }
  )
  return data.page;
}

export async function getAllPagesWithSlug() {
  const data = await fetchAPI(
    `{
      allPages(filter: {permalink: {neq: "index"}}) {
        permalink
      }
    }
  `)
    ;
  return data ?.allPages;
}

export async function getAllPagesForHome(preview) {
  const data = await fetchAPI(
    `{
      morePages: allPages(filter: {permalink: {neq: $permalink}}) {
        title
        permalink
        id
      }
    }`,
    { preview }
  );

  return data;
}

export async function getPageAndMorePages(permalink, preview) {
  const data = await fetchAPI(
    `query PageBySlug($permalink: String) {

      page(filter: {permalink: {eq: $permalink}}) {
        permalink
        title
        backgroundImage {
          responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
            ...responsiveImageFragment
          }
        }
      }

      morePages: allPages(filter: {permalink: {neq: $permalink}}) {
        title
        permalink
        id
      }
    }
    ${responsiveImageFragment}
  `,
    {
      preview,
      variables: {
        permalink
      }
    }
  )
  return data;

}