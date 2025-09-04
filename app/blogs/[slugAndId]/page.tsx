import BlogShareContainer from "@/components/blogs/BlogShareContainer";
import { getBlogs, getSingleBlog } from "@/lib/api/open/queries/trial";
import { sanitizeHtml } from "@/lib/utils/sanitizeHtml";
import { Blog } from "@/types/blog";
import { Box, Container, Typography } from "@mui/material";
import Head from "next/head";
import Image from "next/image";

export async function generateStaticParams() {
  const data = await getBlogs(0);
  return data?.getBlogs.map((blog: Blog) => ({
    slugAndId: `${blog.title?.replaceAll(" ", "-")}-${blog.blogId}`,
  }));
}
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  try {
    const blogId = params.slugAndId.split("-").pop();
    console.log("Blog ID from params:", blogId);

    const data = await getSingleBlog(blogId!);
    console.log("Fetched blog data:", data);
    const blog: Blog = data?.getSingleBlog;
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: blog?.title,
      image: [blog?.imageLink],
      description: blog?.briefDescription,
      author: {
        "@type": "Organization",
        name: "Medlink Jo",
      },
      publisher: {
        "@type": "Organization",
        name: "Medlink Jobs",
        logo: {
          "@type": "ImageObject",
          url: "https://medlinkjobs.com/logo.png",
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://medlinkjobs.com/blogs/${blog?.title?.replaceAll(
          " ",
          "-"
        )}-${blog?.blogId}`,
      },
      datePublished: new Date().toISOString(),
    };
    const descriptionText = blog.briefDescription.replace(/<[^>]*>?/gm, "");
    return {
      title: blog.title,
      description: descriptionText,
      openGraph: {
        title: blog.title,
        description: descriptionText,
        type: "article",
        url: `https://medlinkjobs.com/blogs/${blog.title?.replaceAll(
          " ",
          "-"
        )}-${blog.blogId}`,
        images: [blog.imageLink],
      },
      twitter: {
        card: "summary_large_image",
        title: blog.title,
        description: descriptionText,
        images: [blog.imageLink],
      },
      other: {
        // 👇 Inject JSON-LD manually
        "structured-data": `<script type="application/ld+json">${JSON.stringify(
          structuredData
        )}</script>`,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Blog Details | Medlink Jobs",
      description: "Read our latest blogs and articles on various topics.",
    };
  }
}
export default async function BlogDetailPage({
  params,
}: {
  params: { slugAndId: string };
}) {
  const blogId = params.slugAndId.split("-").pop();
  console.log("Blog ID from params:", blogId);

  const data = await getSingleBlog(blogId!);
  console.log("Fetched blog data:", data);
  const blog: Blog = data?.getSingleBlog;
  if (!blog) return <div>Blog not found</div>;

  const content = sanitizeHtml(blog?.description || "");
  return (
    <Container>
      <Box p={3}>
        <Typography variant="h3" gutterBottom>
          {blog.title}
        </Typography>
        <Box
          sx={{
            position: "relative",
            alignSelf: "center",
            justifySelf: "center",
            width: { xs: "100%", md: "70%" },
            height: "100%",
          }}
        >
          <Image
            src={blog.imageLink}
            alt={blog.title}
            layout="responsive"
            width={"100"}
            height={"100"}
          />
          <BlogShareContainer/>
        </Box>
        <Box
          dangerouslySetInnerHTML={{ __html: content }}
          width={{xs:"100%",md:"70%"}}
          justifySelf={"center"}
        />
      </Box>
    </Container>
  );
}
