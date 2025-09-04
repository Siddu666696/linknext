import { Box, Breadcrumbs, Typography } from '@mui/material';
import Link from 'next/link';
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import React from 'react';
import { useRouter } from 'next/navigation';

const PrivatePolicy = () => {
  const router = useRouter();

  const handleClick = (path: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    router.push(path);
  };

  return (
    <Box sx={{ mx: 4, my: 5, boxShadow: "0px 9px 18px rgba(69, 143, 246, 0.09)", borderRadius: "6px", backgroundColor: "#FFFFFF", p: 4 }}>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" sx={{ mb: 3 }}>
        <Link
          href="/recruiter/recruiterdashboard"
          onClick={handleClick("/recruiter/recruiterdashboard")}
          passHref
        >
          <Typography sx={{ cursor: "pointer" }} color="inherit">
            Home
          </Typography>
        </Link>
        <Typography color="primary" fontSize="14px">Return, Refund And Cancellation Policy</Typography>
      </Breadcrumbs>

      <Typography variant="h1" sx={{ fontSize: "24px", color: "#395987", fontWeight: 600, mb: 3 }}>
        Return, Refund And Cancellation Policy
      </Typography>

      <Box sx={{
        boxShadow: "0px 9px 18px rgba(69, 143, 246, 0.09)",
        borderRadius: "6px",
        backgroundColor: "#FFFFFF",
        p: 4
      }}>
        <Typography sx={{ fontSize: "18px", color: "#4F4F4F", fontWeight: 400, textAlign: "justify" }}>
          Payments for the products or services offered by MedLink Jobs (<a href="https://www.medlinkjobs.com/" target="_blank" rel="noreferrer">https://www.medlinkjobs.com/</a>) shall be on a 100% advance basis.
        </Typography>

        <Typography sx={{ fontSize: "18px", color: "#395987", fontWeight: 600, mt: 4 }}>
          RETURN POLICY
        </Typography>
        <Typography sx={{ fontSize: "18px", color: "#4F4F4F", fontWeight: 400, textAlign: "justify", mt: 2 }}>
          No products or services offered by MedLink Jobs can be returned. However, if you have a service-related concern, please <Link href="/contact-us">click here</Link> or write an email to <a href="mailto:support@medlinkjobs.com" target="_blank" rel="noreferrer">support@medlinkjobs.com</a> and get in touch with our customer care team. Alternatively, contact us at +918639742323 (10 AM to 6.00 PM IST, Monday to Friday).
        </Typography>

        <Typography sx={{ fontSize: "18px", color: "#395987", fontWeight: 600, mt: 4 }}>
          EXCHANGE POLICY
        </Typography>
        <Typography sx={{ fontSize: "18px", color: "#4F4F4F", fontWeight: 400, textAlign: "justify", mt: 2 }}>
          No product or services offered by MedLink Jobs can be exchanged.
        </Typography>

        <Typography sx={{ fontSize: "18px", color: "#395987", fontWeight: 600, mt: 4 }}>
          CANCELLATION POLICY
        </Typography>
        <Typography sx={{ fontSize: "18px", color: "#4F4F4F", fontWeight: 400, textAlign: "justify", mt: 2 }}>
          Service or product purchased cannot be cancelled. For further queries please <Link href="/contact-us">click here</Link> or write an email to <a href="mailto:support@medlinkjobs.com" target="_blank" rel="noreferrer">support@medlinkjobs.com</a> and get in touch with our customer care team. Alternatively, contact us at +918639742323 (10 AM to 6.00 PM IST, Monday to Friday).
        </Typography>

        <Typography sx={{ fontSize: "18px", color: "#395987", fontWeight: 600, mt: 4 }}>
          REFUND POLICY
        </Typography>
        <Typography sx={{ fontSize: "18px", color: "#4F4F4F", fontWeight: 400, textAlign: "justify", mt: 2 }}>
          MedLink Jobs does not offer any refunds or credits. Refunds for unused services that have been pre-paid will not be refunded. However, if you have a service-related concern, please <Link href="/contact-us">click here</Link> or write an email to <a href="mailto:support@medlinkjobs.com" target="_blank" rel="noreferrer">support@medlinkjobs.com</a> and get in touch with our customer care team. Alternatively, contact us at +918639742323 (10 AM to 6.00 PM IST, Monday to Friday).
        </Typography>

        <Typography sx={{ fontSize: "18px", color: "#395987", fontWeight: 600, mt: 4 }}>
          FAILED ORDERS
        </Typography>
        <Typography sx={{ fontSize: "18px", color: "#4F4F4F", fontWeight: 400, textAlign: "justify", mt: 2 }}>
          Please <Link href="/contact-us">click here</Link> or write an email to <a href="mailto:support@medlinkjobs.com" target="_blank" rel="noreferrer">support@medlinkjobs.com</a> and get in touch with our customer care team. Alternatively, contact us at +918639742323 (10 AM to 6.00 PM IST, Monday to Friday).
        </Typography>
      </Box>
    </Box>
  );
};

export default PrivatePolicy;
