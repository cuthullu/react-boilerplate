export async function* streamSubreddit(subreddit) {
  let after = ''
  while (true) {
    const url = `https://www.reddit.com/r/${subreddit}.json?&after=${after}`
    const resp = await fetch(url)
    const jsonResp = await resp.json()
    after = jsonResp.data.after
    yield* jsonResp.data.children.map(({ data }) => data.preview.images[0].source.url)
  }
}
