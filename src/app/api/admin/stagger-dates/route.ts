import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// One-time use endpoint — delete after running
// Call: POST https://bitsolmarketing.com/api/admin/stagger-dates
// Body: { "secret": "stagger2026" }

export async function POST(req: Request) {
  const { secret } = await req.json().catch(() => ({}));

  if (secret !== "stagger2026") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const posts = await prisma.blog.findMany({
    where: { published: true },
    orderBy: { createdAt: "asc" },
    select: { id: true, title: true },
  });

  if (posts.length === 0) {
    return NextResponse.json({ message: "No published posts found." });
  }

  // Spread posts over ~20 weeks at ~3/week, ending 7 days ago
  const endDate = new Date();
  endDate.setDate(endDate.getDate() - 7);
  const daysBetween = 7 / 3; // ~2.33 days between posts

  const results: { title: string; date: string }[] = [];

  for (let i = 0; i < posts.length; i++) {
    const daysBack = Math.round((posts.length - 1 - i) * daysBetween);
    const postDate = new Date(endDate);
    postDate.setDate(postDate.getDate() - daysBack);
    postDate.setHours(4 + (i % 8), (i * 7) % 60, 0, 0); // UTC 4–11 = PKT 9am–4pm

    await prisma.blog.update({
      where: { id: posts[i].id },
      data: { createdAt: postDate, updatedAt: postDate },
    });

    results.push({
      title: posts[i].title.slice(0, 55),
      date: postDate.toISOString().split("T")[0],
    });
  }

  return NextResponse.json({
    success: true,
    updated: results.length,
    posts: results,
  });
}
