import tiny from "tiny-json-http";

const NEXT_EXAMPLE_CMS_DATOCMS_API_TOKEN = process.env['NEXT_DATOCMS_API_TOKEN'];
// using an environment variable starting with NEXT_ so that it will be embedded into the bundle.


export async function request({ query, variables, preview }) {
  let endpoint = "https://graphql.datocms.com";

  if (process.env.NEXT_DATOCMS_ENVIRONMENT) {
    endpoint += `/environments/${process.env.NEXT_DATOCMS_ENVIRONMENT}`;
  }

  if (preview) {
    endpoint += `/preview`;
  }

  const { body } = await tiny.post({
    url: endpoint,
    headers: {
      authorization: `Bearer ${NEXT_EXAMPLE_CMS_DATOCMS_API_TOKEN}`,
    },
    data: {
      query,
      variables,
    },
  });

  if (body.errors) {
    console.error("Ouch! The query has some errors!");
    throw body.errors;
  }

  return body.data;
}