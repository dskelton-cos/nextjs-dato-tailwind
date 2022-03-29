const NEXT_DATOCMS_API_TOKEN = process.env['NEXT_DATOCMS_API_TOKEN'];
const mySecret = process.env['NEXT_DATOCMS_ENVIRONMENT'] || null
import { responsiveImageFragment } from './fragments.js';

async function fetchAPI(query, { variables, preview } = {}) {

  let endpoint = "https://graphql.datocms.com";

  if (mySecret) {
    endpoint += `/environments/${mySecret}`;
  }

  if (preview) {
    endpoint += `/preview`;
  }

  console.log(endpoint)
  const res = await fetch(endpoint, {
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
        id
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
            content(markdown: true)
            heading
            image {
             id
             url
            }
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

export async function getHomePage(preview) {
  const data = await fetchAPI(`{
      home {
        id
        backgroundImage {
          responsiveImage(imgixParams: {fit: crop, w: 1200, h: 700, auto: format }) {
            ...responsiveImageFragment
          }
        }
        title
        strapLine
      }
    } 
    ${responsiveImageFragment}`, {preview});
  
  return data;
  
}

export async function getPages(preview) {
  const data = await fetchAPI(`{
      allPages {
        id
        title
        location
        backgroundImage {
          responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 300, h: 300 }) {
            ...responsiveImageFragment
          }
        }
        permalink
      }
    } 
    ${responsiveImageFragment}`, {preview});
  
  return data?.allPages;
  
}

