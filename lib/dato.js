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
        content(markdown: true)
        strapLine
        backgroundImage {
          responsiveImage(imgixParams: {fit: crop, w: 1200, h: 700, auto: format }) {
            ...responsiveImageFragment
          }
        }
        modularContent {
          ... on HightlightRecord {
            id
            content
            heading
          }
        }
      }

      morePages: allPages(filter: {permalink: {notIn: ["index", $permalink]}}) {
        title
        permalink
        id
        location

        backgroundImage {
          responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 300, h: 300 }) {
            ...responsiveImageFragment
          }
        }

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