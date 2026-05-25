import { MetadataRoute } from 'next';
import { projects } from '@/lib/portfolio';
import { services } from '@/lib/services';
import { prisma } from '@/lib/prisma';

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    return await buildSitemap();
  } catch {
    return [{ url: 'https://bitsolmarketing.com', lastModified: new Date(), priority: 1.0 }];
  }
}

async function buildSitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://bitsolmarketing.com';

  const now = new Date();
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`,                                    priority: 1.0,  changeFrequency: 'weekly',  lastModified: now },
    { url: `${baseUrl}/about`,                              priority: 0.9,  changeFrequency: 'monthly', lastModified: now },
    { url: `${baseUrl}/services`,                           priority: 0.95, changeFrequency: 'weekly',  lastModified: now },
    { url: `${baseUrl}/pricing`,                            priority: 0.9,  changeFrequency: 'weekly',  lastModified: now },
    { url: `${baseUrl}/blog`,                               priority: 0.9,  changeFrequency: 'daily',   lastModified: now },
    { url: `${baseUrl}/contact`,                            priority: 0.9,  changeFrequency: 'monthly', lastModified: now },
    { url: `${baseUrl}/portfolio`,                          priority: 0.75, changeFrequency: 'weekly',  lastModified: now },
    { url: `${baseUrl}/ai-solutions`,                       priority: 0.8,  changeFrequency: 'weekly',  lastModified: now },
    { url: `${baseUrl}/trading`,                            priority: 0.75, changeFrequency: 'monthly', lastModified: now },
    { url: `${baseUrl}/courses`,                            priority: 0.7,  changeFrequency: 'monthly', lastModified: now },
    { url: `${baseUrl}/terms`,                              priority: 0.3,  changeFrequency: 'yearly',  lastModified: now },
    { url: `${baseUrl}/privacy`,                            priority: 0.3,  changeFrequency: 'yearly',  lastModified: now },
    { url: `${baseUrl}/cookies`,                            priority: 0.2,  changeFrequency: 'yearly',  lastModified: now },
    { url: `${baseUrl}/compliance`,                         priority: 0.2,  changeFrequency: 'yearly',  lastModified: now },
    // City-specific pages — high local SEO priority
    { url: `${baseUrl}/digital-marketing-agency-karachi`,   priority: 0.9,  changeFrequency: 'weekly',  lastModified: now },
    { url: `${baseUrl}/digital-marketing-agency-lahore`,    priority: 0.9,  changeFrequency: 'weekly',  lastModified: now },
    { url: `${baseUrl}/digital-marketing-agency-islamabad`, priority: 0.9,  changeFrequency: 'weekly',  lastModified: now },
  ];

  const servicePages = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const portfolioPages = projects.map((project) => ({
    url: `${baseUrl}/portfolio/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const posts = await prisma.blog.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
      orderBy: { createdAt: 'desc' },
    });
    blogPages = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
  } catch {
    // DB unavailable at build time — skip blog entries
  }

  return [...staticPages, ...servicePages, ...portfolioPages, ...blogPages];
}
