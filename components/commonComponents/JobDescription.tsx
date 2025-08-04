// pages/job/[id].tsx or a component like JobDescription.tsx
import React from 'react';
import { sanitizeHtml } from '../../lib/utils/sanitizeHtml'

type Props = {
  description: string;
};

const JobDescription: React.FC<Props> = ({ description }) => {
  const cleanHtml = sanitizeHtml(description);

  return (
    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
};

export default JobDescription;
