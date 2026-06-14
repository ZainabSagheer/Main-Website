async function main() {
  const API_URL = "https://bitsolmarketing.com/api/blog?limit=200";
  console.log(`Fetching live blogs from: ${API_URL}`);
  try {
    const res = await fetch(API_URL);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    const posts = await res.json();
    console.log(`Total live posts: ${posts.length}`);
    posts.forEach((p, idx) => console.log(`${idx + 1}. [${p.slug}] - ${p.title}`));
  } catch (err) {
    console.error("Failed to fetch live blogs:", err.message);
  }
}
main();
