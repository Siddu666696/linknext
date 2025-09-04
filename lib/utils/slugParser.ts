// lib/slugParser.ts
export function parseSlugToFilters(slug?: string[]): {
  slugQuery: string;
  filters: {
    location: string;
    education: string;
    experienceRange: { min: number; max: number };
    skills: string[];
    specialization: string;
    salaryRange: { min: number; max: number };
    jobType: string;
    hospital: string;
  };
} {
  if (!slug || slug.length === 0) {
    return {
      slugQuery: '',
      filters: {
        location: '',
        education: '',
        experienceRange: { min: 0, max: 20 },
        skills: [],
        specialization: '',
        salaryRange: { min: 0, max: 100 },
        jobType: '',
        hospital: '',
      },
    };
  }

  const fullSlug = slug.join('-').toLowerCase();

  // Match patterns like "nurse-jobs-in-hyderabad"
  const jobInLocationRegex = /^(.*?)(?:-jobs)?(?:-in-)(.*)$/;
  const match = fullSlug.match(jobInLocationRegex);

  let slugQuery = '';
  let location = '';

  if (match) {
    slugQuery = match[1].replace(/-/g, ' ').trim();      // e.g., "pharmacist"
    location = match[2].replace(/-/g, ' ').trim();   // e.g., "hyderabad"
  } else {
    slugQuery = fullSlug.replace(/-/g, ' ').trim(); // fallback: use the whole slug
  }

  return {
    slugQuery,
    filters: {
      location,
      education: '',
      experienceRange: { min: 0, max: 20 },
      // skills: [],
      specialization: '',
      salaryRange: { min: 0, max: 100 },
      jobType: '',
      hospital: '',
    },
  };
}
