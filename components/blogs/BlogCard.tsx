import { Blog } from "@/lib/utils/types";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import Link from "next/link";

export default function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Link
      href={`/blogs/${blog.title?.replaceAll(" ", "-")}-${blog.blogId}`}
      passHref
    >
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image={blog.imageLink}
          alt={blog.title}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2, // Clamp to 3 lines
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              minHeight: "3em", // Approx. height for 3 lines
            }}
            component="div"
          >
            {blog.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 3, // Clamp to 3 lines
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              minHeight: "4.5em", // Approx. height for 3 lines
            }}
            color="text.secondary"
          >
            {blog.briefDescription}
          </Typography>
          <Button sx={{ mt: 1 }}>Read More</Button>
        </CardContent>
      </Card>
    </Link>
  );
}
