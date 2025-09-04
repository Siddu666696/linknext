import { SemanticJobSearchResponse } from "@/lib/utils/types";
import { serverClient } from "../openServerClient";
import { getAVacancy_Query, getBlogs_Query, getSingleBlog_Query, sematicSearchJobs_Query } from "./query";
export const semanticSearchJobs = async ({
  limit = 10,
  offset = 0,
  query,
  sortBy = "relevance",
  filters,
}: {
  limit?: number;
  offset?: number;
  query?: string;
  sortBy?: string;
  filters?: Record<string, unknown>;
}): Promise<SemanticJobSearchResponse | null> => {
  try {
    const response = await serverClient?.graphql({
      query: sematicSearchJobs_Query,
      variables: {
        limit,
        offset,
        query,
        sortBy,
        filters,
      },
    });

    return response?.data || [];
  } catch (error) {
    console.error("Error fetching semantic search jobs:", error);
    return [];
  }
};
export const getAVacancy = async (vacancyID: number): Promise<object | null> => {
  try {
    const response = await serverClient?.graphql({
      query: getAVacancy_Query,
      variables: {
        vacancyID,
      },
    });

    return response?.data || [];
  } catch (error) {
    console.error("Error fetching semantic search jobs:", error);
    return {};
  }
};
export const getBlogs = async (category: number): Promise<object | null> => {
  try {
    const response = await serverClient?.graphql({
      query: getBlogs_Query,
      variables: {
        category,
      },
    });

    return response?.data || [];
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return {};
  }
};
export const getSingleBlog = async (blogId: number): Promise<object | null> => {
  try {
    const response = await serverClient?.graphql({
      query: getSingleBlog_Query,
      variables: {
        blogId,
      },
    });

    return response?.data || [];
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return {};
  }
};