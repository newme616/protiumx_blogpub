import axios from 'axios';

import { Article, PublishedArticle } from '$/types';

const MAX_TAGS = 4;

export async function createArticle(
  apiKey: string,
  { config, content }: Article,
): Promise<PublishedArticle> {
  const payload = {
    article: {
      body_markdown: content,
      cover_image: config.cover_image,
      description: config.description,
      published: config.published,
      title: config.title,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      tags: config.tags!.split(/,\s*/).slice(0, MAX_TAGS),
    },
  };
  const result = (
    await axios.post('https://dev.to/api/articles', payload, {
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
    })
  ).data as PublishedArticle;
  return result;
}
