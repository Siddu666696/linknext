"use client";

import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

type AggregationItem = {
  doc_count: number;
  key: string;
};

type Aggregations = {
  Skills?: AggregationItem[];
  Location?: AggregationItem[];
  Specialization?: AggregationItem[];
};

interface CategoryCardsProps {
  aggregations: Aggregations;
}

const getSeoFriendlyUrl = (type: string, key: string) => {
  const slug = key
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "");
  return `/jobs/${type}/${slug}`;
};

const getCardImage = (category: string, key: string) => {
  // Map category/role/location to an image
  const defaultImage = "/images/default-card.jpg";
  const roleImages: Record<string, string> = {
    pharmacist: "/images/pharmacist.jpg",
    pediatrician: "/images/pediatrician.jpg",
    "cath-lab-technician": "/images/cath-lab-technician.jpg",
  };

  const slug = key
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "");

  return roleImages[slug] || defaultImage;
};

const CategoryCards: React.FC<CategoryCardsProps> = ({ aggregations }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const sections = [
    { title: "Explore by Role", key: "Skills" },
    { title: "Top Locations", key: "Location" },
    { title: "Specializations", key: "Specialization" },
  ];

  return (
    <Box sx={{ py: 6, px: { xs: 2, md: 4 } }}>
      {sections.map((section) => {
        const data = aggregations[section.key as keyof Aggregations] || [];
        if (data.length === 0) return null;

        return (
          <Box key={section.key} sx={{ mb: 6 }}>
            <Typography
              variant="h4"
              sx={{
                mb: 3,
                fontWeight: 700,
                color: "primary.main",
                textAlign: "center",
              }}
            >
              {section.title}
            </Typography>

            {isMobile ? (
              // Mobile carousel
              <Swiper
                spaceBetween={16}
                slidesPerView={1.2}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                modules={[Autoplay, Pagination]}
              >
                {data
                  .filter((item) => item.key && item.doc_count > 0)
                  .slice(0, 10)
                  .map((item) => (
                    <SwiperSlide key={item.key}>
                      <Link
                        href={getSeoFriendlyUrl(section.key, item.key)}
                        passHref
                      >
                        <Card
                          sx={{
                            height: "100%",
                            borderRadius: 3,
                            overflow: "hidden",
                            boxShadow: 4,
                          }}
                        >
                          <Box
                            sx={{
                              position: "relative",
                              height: 160,
                              width: "100%",
                            }}
                          >
                            <Image
                              src={getCardImage(section.key, item.key)}
                              alt={item.key}
                              fill
                              style={{ objectFit: "cover" }}
                              sizes="100vw"
                            />
                          </Box>
                          <CardContent>
                            <Typography
                              variant="h6"
                              sx={{ mb: 1, fontWeight: 600 }}
                            >
                              {item.key}
                            </Typography>
                            <Chip
                              label={`${item.doc_count} jobs`}
                              color="primary"
                              size="small"
                            />
                          </CardContent>
                        </Card>
                      </Link>
                    </SwiperSlide>
                  ))}
              </Swiper>
            ) : (
              // Desktop grid with scroll animations
              <Grid container spacing={3}>
                {data
                  .filter((item) => item.key && item.doc_count > 0)
                  .slice(0, 8)
                  .map((item, index) => (
                    <Grid item xs={12} sm={6} md={3} key={item.key}>
                      <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: index * 0.1,
                          duration: 0.5,
                          ease: "easeOut",
                        }}
                      >
                        <Link
                          href={getSeoFriendlyUrl(section.key, item.key)}
                          passHref
                        >
                          <Card
                            sx={{
                              height: "100%",
                              borderRadius: 3,
                              overflow: "hidden",
                              boxShadow: 3,
                              cursor: "pointer",
                              transition: "transform 0.2s ease",
                              "&:hover": {
                                transform: "scale(1.03)",
                                boxShadow: 6,
                              },
                            }}
                          >
                            <Box
                              sx={{
                                position: "relative",
                                height: 160,
                                width: "100%",
                              }}
                            >
                              <Image
                                src={getCardImage(section.key, item.key)}
                                alt={item.key}
                                fill
                                style={{ objectFit: "cover" }}
                                sizes="(max-width: 768px) 100vw, 33vw"
                              />
                            </Box>
                            <CardContent>
                              <Typography
                                variant="h6"
                                sx={{ mb: 1, fontWeight: 600 }}
                              >
                                {item.key}
                              </Typography>
                              <Chip
                                label={`${item.doc_count} jobs`}
                                color="primary"
                                size="small"
                              />
                            </CardContent>
                          </Card>
                        </Link>
                      </motion.div>
                    </Grid>
                  ))}
              </Grid>
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default CategoryCards;
