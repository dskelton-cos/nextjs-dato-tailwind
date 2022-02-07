
import {request} from './datocms';

export async function getAllPages(preview) {
  const data = await request(
    `{
        allPages {
        id
        title
        _status
        _firstPublishedAt
        permalink
      }
    }`,
    { preview }
  );
  return data;
}