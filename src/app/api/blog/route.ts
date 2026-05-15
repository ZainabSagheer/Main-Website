import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const posts = await prisma.blog.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        author: true,
        image: true,
        excerpt: true,
        tags: true,
        createdAt: true,
      },
    });
    return NextResponse.json(posts);
  } catch {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const apiKey = req.headers.get("x-api-key");
    if (!apiKey || apiKey !== process.env.BLOG_API_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, content, slug, author, image, excerpt, metaDescription, tags } = body;

    if (!title || !content || !slug) {
      return NextResponse.json({ error: "title, content, and slug are required" }, { status: 400 });
    }

    const post = await prisma.blog.create({
      data: {
        title,
        content,
        slug,
        author: author || "BITSOL MARKETING",
        image: image || null,
        excerpt: excerpt || null,
        metaDescription: metaDescription || null,
        tags: tags || [],
        published: true,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create post";
    if (message.includes("Unique constraint")) {
      return NextResponse.json({ error: "A post with this slug already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
