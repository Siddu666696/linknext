import { getBlogsQuery } from "@/lib/graphql";
import { Container, Grid, Typography } from "@mui/material";
import { Blog } from "@/lib/utils/types";
import BlogCard from "@/components/blogs/BlogCard";
import { getBlogs } from "@/lib/api/open/queries/trial";

export default async function BlogListPage() {
  const res = await getBlogs("0");
  const blogs: Blog[] = res?.getBlogs;

  console.log(res, "res from blogs");

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        All Blogs
      </Typography>
      <Grid container spacing={4}>
        {blogs.map((blog) => (
          <Grid item key={blog.blogId} xs={12} sm={6} md={4}>
            <BlogCard blog={blog} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
