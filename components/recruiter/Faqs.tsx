import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Container,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const faqs = [
    
  {
    id: 1,
    question: 'What are the steps to create a profile on MedLink Jobs?',
    answer: `Here's how you can create a profile on medlinkjobs.com:<br/><br/>

1. Go to the medlinkjobs.com website: Type "www.medlinkjobs.com" in your browser and hit Enter.<br/><br/>

2. Register for a new account: Click on the "Login/Register" button, usually at the top right corner.<br/><br/>

3. Enter your personal details: Name, email, location, and mobile number.<br/><br/>

4. Create a password: Choose a strong password for your MedLink Jobs account.<br/><br/>

5. Verify your email: You’ll receive a verification email. Click the link to verify.<br/><br/>

6. Complete your profile: Log in and click "Update Profile" to add your professional experience, education, skills, and more. Don’t forget to save.<br/><br/>

7. Upload your resume: Go to the "Profile" section and click "Upload Resume" to attach your CV.<br/><br/>

8. Set job preferences: Use the "Desired Career Profile" section to define what jobs you're looking for.<br/><br/>

💡 Keep your profile updated and professional to get the best job recommendations.`,
  },
  {
    id: 2,
    question: 'How can I edit my Profile?',
    answer: `Updating or editing your profile on medlinkjobs.com involves similar steps as creating the profile. Here's how you can do it:<br/><br/>

1. Log in to your account: Go to medlinkjobs.com and log in using your registered email ID or Phone number and password.<br/><br/>

2. Click 'Profile' from the menu, this will take you to your personal profile page.<br/><br/>

4. Edit the desired fields: Now, you can choose the section that you want to update. The profile is generally divided into multiple sections like Personal Details, Employment/Experience Details, Education Details, Healthcare Skills, etc. Click on the pencil icon or 'Edit' next to each section to make changes.<br/><br/>

5. Update the details: Once you are in the editing mode, make the necessary changes. This could be updating your contact information, adding a new skill, or changing your job preferences.<br/><br/>

6. Save the changes: After updating the required information, make sure to click 'Save' at the bottom of the page to ensure that your changes are stored.<br/><br/>

7. Update your resume: If you've made significant changes to your profile, such as changing jobs or acquiring new skills, you should also update your uploaded resume to reflect these changes. You can do this by clicking on 'Upload New Resume'.<br/><br/>

Remember, your medlinkjobs.com profile is like your online resume. Keeping it updated and accurate can increase your chances of being noticed by potential employers.<br/><br/>
`
  },
  {
    id: 3,
    question: 'How do I search for jobs on MedLink Jobs?',
    answer:`Searching for jobs on www.medlinkjobs.com is quite simple and user-friendly. Here's how you can do it:<br/><br/>

1. Go to the www.medlinkjobs.com website: You can do this by typing "www.medlinkjobs.com" into the address bar of your internet browser and hitting Enter.<br/><br/>

2. Enter Job Details: On the homepage, you'll find a search bar where you can enter details like job keywords (for example, job title, skills, or company name), and preferred location.<br/><br/>

3. Click 'Search': After entering your desired details, click on the 'Search' button to view the job listings that match your criteria.<br/><br/>

4. Use Filters: On the search results page, you can narrow down the results using filters like salary, job type, industry, education level, etc. These filters are usually present on the left-hand side of the screen.<br/><br/>

5. Browse Job Listings: Browse through the list of job opportunities that appear based on your search criteria and filters. You can click on a job title to view more details about the position.<br/><br/>

6. Apply for Jobs: If you find a job that matches your skills and interests, you can apply directly through the website by clicking on the 'Apply' button.<br/><br/>

7. Create Job Alerts: If you want to receive notifications about new job postings that match your criteria, you can create a job alert. You'll typically find this option at the top or bottom of the search results page.<br/><br/>

Remember to log in to your updated www.medlinkjobs.com account before you start applying to jobs. This way, potential employers will be able to view your complete profile and get in touch with you if they're interested.<br/><br/>

`,
  },
  
  {
    id: 4,
    question: 'How can I create an alert for a saved search?',
    answer: `To save a search as an alert:<br/>
1. Type your search query in the search bar<br/>
2. Click Search<br/>
3. Start scrolling down the search result<br/>
4. At the bottom of the screen, a small section appears with "Create Job Alert"<br/>
5. Type a name for your job alert and click Create Job Alert<br/>
6. You can find the alert by clicking on Jobs > Manage Alert. Click on Manage Alerts to view, or delete the job alert.`,
  },
  {
    id: 5,
    question: 'What is the process for applying to a job on MedLink Jobs?',
    answer: `Searching for jobs on www.medlinkjobs.com is quite simple and user-friendly. Here's how you can do it:<br/><br/>

1. Go to the www.medlinkjobs.com website: You can do this by typing "www.medlinkjobs.com" into the address bar of your internet browser and hitting Enter.<br/><br/>

2. Enter Job Details: On the homepage, you'll find a search bar where you can enter details like job keywords (for example, job title, skills, or company name), and preferred location.<br/><br/>

3. Click 'Search': After entering your desired details, click on the 'Search' button to view the job listings that match your criteria.<br/><br/>

4. Use Filters: On the search results page, you can narrow down the results using filters like salary, job type, industry, education level, etc. These filters are usually present on the left-hand side of the screen.<br/><br/>

5. Browse Job Listings: Browse through the list of job opportunities that appear based on your search criteria and filters. You can click on a job title to view more details about the position.<br/><br/>

6. Apply for Jobs: If you find a job that matches your skills and interests, you can apply directly through the website by clicking on the 'Apply' button.<br/><br/>

7. Create Job Alerts: If you want to receive notifications about new job postings that match your criteria, you can create a job alert. You'll typically find this option at the top or bottom of the search results page.<br/><br/>

Remember to log in to your updated www.medlinkjobs.com account before you start applying to jobs. This way, potential employers will be able to view your complete profile and get in touch with you if they're interested.`,
  },
  {
    id: 6,
    question: 'What is the usual response time for job applications?',
    answer: `The time it takes to get a response after applying for a job can vary widely and depends on numerous factors. These include the company's size, the industry, the specific role, the number of applications received, and the urgency of the hiring need.<br/><br/>

Generally, you might expect to hear back anywhere from a few days to a few weeks after submitting an application. However, it can sometimes take longer, particularly for highly sought-after positions that attract a large number of applicants or for roles in larger organizations with more complex hiring processes.<br/><br/>

It's worth noting that not all companies send rejection letters, so you might not receive a response if you're not selected for an interview. If you haven't heard back within a couple of weeks and you're very interested in the role, it could be appropriate to send a polite follow-up email to inquire about the status of your application.<br/><br/>

However, it's important to balance demonstrating your interest with respecting the employer's process and time. If the job posting specifically asks applicants not to follow up, it's best to respect this request.<br/><br/>

Remember that job hunting often involves a degree of patience, and it can be helpful to keep applying for other roles while you wait to hear back, rather than putting all your hopes on one position.`,
  },
  {
    id: 7,
    question: 'How to effectively track job applications?',
    answer: `Tracking your job application typically involves keeping a record of the positions you have applied for, the companies you have contacted, and the stages of the application process you have completed. Here are some steps you can follow to effectively track your job applications:<br/><br/>

1. Create a spreadsheet or use a job tracking template: Set up a spreadsheet or use a job tracking template to maintain a centralized record of your job applications. This will help you organize and track important details.<br/><br/>

2. Record essential information: Include columns for the company name, job title, application date, contact information, and any other pertinent details. You may also want to add additional columns for the stages of the application process, such as resume submission, phone screening, interviews, and follow-ups.<br/><br/>

3. Set reminders: Take note of important dates, such as interview dates, follow-up deadlines, or when you should expect to hear back from the employer. Set reminders on your calendar or use task management tools to stay on top of these dates.<br/><br/>

4. Follow up appropriately: After submitting your application, it's important to follow up with the employer. Note down the date and method of follow-up, whether it's through email, phone call, or any other communication medium. Use your job tracking system to record these interactions.<br/><br/>

5. Maintain communication records: Keep a log of all the correspondence with the employer, including emails, phone conversations, and any other relevant communication. This will help you refer back to specific details or instructions provided by the employer.<br/><br/>

6. Update the status: Regularly update the status of each application as you progress through the hiring process. For example, mark the application as "In Progress" when you have submitted it, "Interview Scheduled" when you have been invited for an interview, and "Offer Received" if you receive a job offer.<br/><br/>

7. Evaluate your progress: Take the time to review your job tracking records periodically. Assess which applications are still active, which ones have progressed, and which ones you may need to follow up on. This evaluation will help you stay organised and ensure you don't miss any opportunities.<br/><br/>

Remember, every job application process may differ, so adjust your tracking system to suit your needs. By keeping a comprehensive record, you can stay organised, remain engaged in the process, and increase your chances of landing the job you desire.`,
  },
  {
    id: 8,
    question: 'Are there any fees associated with job applications or scheduling interview calls? / Should I be concerned if recruiters ask for payment to schedule job interviews?',
    answer: `Jobseekers can apply to jobs for FREE on MedLink Jobs. MedLink Jobs do not charge fee to search and apply to the job. Also you should not have to pay to apply for a job or to schedule an interview. Legitimate employers and recruiters do not charge job seekers for the opportunity to apply or interview for a position. It is important to be cautious of any job postings or recruiters that ask for payment as a requirement for applying or scheduling an interview, as it could be a potential scam or fraudulent activity.<br/><br/>

Here are a few points to keep in mind:<br/><br/>

1. Application fees: Most reputable employers do not charge application fees. The purpose of an application is for you to showcase your qualifications and skills to the employer, not to pay for the privilege of applying. Be aware of any job postings or websites that require you to pay a fee upfront.<br/><br/>

2. Interview fees: Legitimate employers also do not typically charge candidates for scheduling an interview. The interview process is part of their assessment to determine the suitability of applicants for the job. If a recruiter or employer asks for payment to schedule an interview, it is advisable to proceed with caution and thoroughly research the company before proceeding.<br/><br/>

3. Research the employer: Before applying for a job or interacting with a recruiter, research the company to ensure its legitimacy. Look for an official website, check their online presence and reputation, and read reviews from other job seekers. Legitimate companies will have a professional online presence and will not engage in practices that require job seekers to pay for interviews.<br/><br/>

4. Trust your instincts: If something feels off or too good to be true, it's essential to trust your instincts. Scammers may try to exploit job seekers by posing as recruiters or employers and asking for payment. Be cautious of any unusual requests and prioritise your safety and financial security.<br/><br/>

5. Report suspicious activity: If you encounter any suspicious job postings or recruiters who ask for payment, it's crucial to report them. Contact the relevant authorities or job boards where the posting is listed to ensure others are protected from potential scams.<br/><br/>

Remember, the primary goal of a legitimate employer is to find the right candidate for the job, and they do not require candidates to pay for the application process or interviews. Stay vigilant, research employers thoroughly, and prioritise your personal and financial safety during your job search.
`,
  },
  {
    id: 9,
    question: "What steps can I take if I couldn't find a job matching my profile on MedLink Jobs?",
    answer: `If you have searched for jobs on MedLink Jobs platform but couldn't find a suitable match for your profile, here are some steps you can take:<br/><br/>

1. Refine your search criteria: Review the keywords, job titles, and filters you used during your job search. Consider modifying and expanding your search criteria to include relevant variations, alternate job titles, or broader job categories. This can help you cast a wider net and increase your chances of finding relevant opportunities.<br/><br/>

2. Update your profile and resume: Ensure that your MedLink Jobs profile and resume accurately reflect your skills, qualifications, and work experience. Make sure you have highlighted key achievements and relevant keywords that recruiters might be looking for. Additionally, consider tailoring your resume to specific job openings to enhance your chances of getting noticed.<br/><br/>

3. Enhance your skills: If you find that your skills or qualifications are not aligning well with the job opportunities you are seeking, consider upskilling or taking courses to enhance your skill set. This can make you more competitive in the job market and open up new opportunities.<br/><br/>

4. Seek professional assistance: If you are having difficulty finding suitable job opportunities, you may consider seeking the help of a career coach or job search advisor. They can provide personalised guidance, review your resume, help with interview preparation, and offer strategies to enhance your job search.<br/><br/>

Remember, finding the right job can take time, persistence, and proactive effort. Stay positive, continuously refine your search, and utilise multiple strategies to increase your chances of finding a suitable opportunity that aligns with your profile and career goals.`,
  },
  {
    id: 10,
    question: 'What is Recommended Jobs?',
    answer: `"Recommended Jobs" typically refer to job listings or suggestions provided by a job MedLink Jobs platform based on your profile, search history, and preferences. These recommendations are tailored to match your skills, qualifications, experience, and the criteria you have specified during your job search.<br/><br/>

The purpose of Recommended Jobs is to help job seekers discover relevant opportunities more efficiently and effectively. Here's how it generally works:<br/><br/>

1. Profile analysis: When you create an account on a job platform orMedLink Jobs website, you typically provide information about your education, work experience, skills, and preferences. The platform analyses this information to understand your profile and the types of jobs you might be interested in.<br/><br/>

2. Search history and behaviour: As you search for jobs, the platform keeps track of your search history, the job listings you have viewed, and the filters you have applied. This data is used to gather insights into your job preferences and refine the recommendations accordingly.<br/><br/>

3. Matching algorithms: MedLink Jobs employ algorithms that compare your profile and preferences with the available job listings on their platform. These algorithms use various factors, such as keywords, location, job titles, skills, and industry, to identify potential matches.<br/><br/>

4. Personalised recommendations: Based on the analysis of your profile, search history, and matching algorithms, the job platform generates a list of Recommended Jobs specifically curated for you. These recommendations are often displayed on your dashboard, email notifications, or within the job search results.<br/><br/>

5. Refinement and updates: The recommended job listings may evolve over time as you continue to interact with the platform. As you apply for jobs, save job listings, or provide feedback on the recommendations, we learn from your actions and further refine the suggestions it provides.<br/><br/>

Additionally, while Recommended Jobs are designed to match your profile and preferences, it's always a good practice to review each job listing carefully. Pay attention to the job requirements, responsibilities, and company details to determine if it aligns with your career goals and interests.


`,
  },
  {
    id:11,
    question:"Why is my Profile not receiving any views? or Why haven't employers viewed my CV?",
 answer: `There could be several reasons why you may not be receiving views on your profile or why employers have not viewed your CV. Here are a few possible factors to consider:<br/><br/>

1. Incomplete or insufficient profile information: Ensure that your profile on MedLink Jobs platform is complete, including details about your education, work experience, skills, and qualifications. An incomplete or sparse profile may discourage employers from viewing it. Provide comprehensive and accurate information to increase your chances of attracting attention.<br/><br/>

2. Lack of keywords or relevance: Employers often search for candidates using specific keywords or criteria. If your profile or CV does not contain relevant keywords or fails to showcase your skills and experience effectively, it may not appear in their search results. Tailor your profile and CV to include industry-specific keywords and highlight your accomplishments and qualifications.<br/><br/>

3. Competitive job market: Depending on the industry and location, the job market can be highly competitive, resulting in a larger pool of candidates. If employers receive a high volume of applications, it may be challenging for them to view every CV or profile. Consider enhancing your job search strategy by exploring multiple avenues, including networking, referrals, and direct contact with companies.<br/><br/>

4. CV formatting or presentation: The visual appeal and organisation of your CV can significantly impact its chances of being viewed. Ensure that your CV is well-formatted, easy to read, and presents your qualifications clearly. Use bullet points, headings, and appropriate formatting techniques to make your CV visually appealing and easy to navigate.<br/><br/>

5. Limited application activity: If you haven't been applying to jobs or engaging in the job market actively, it's possible that your profile or CV has not been seen by employers. Regularly search for relevant opportunities, apply to positions, and follow up on applications to increase your visibility and activity in the job market.<br/><br/>

6. Lack of relevant experience or skills: Employers often seek candidates with specific experience or skills. If your profile or CV does not align closely with their requirements, they may be less likely to view it. Consider gaining additional experience or enhancing your skills through internships, volunteering, or training programs to improve your competitiveness in the job market.<br/><br/>

Remember that securing job views and attracting employers requires a combination of a well-crafted profile, active engagement in the job market, and networking efforts. Continuously refine your profile and CV, tailor them to specific job opportunities, and consider seeking feedback from professionals or career advisors to improve your chances of getting noticed.`,
  }
];

const Faqs = () => {
    const [expanded, setExpanded] = useState([]);

  const handleToggle = (id) => {
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  return (
    <Container sx={{ mt: 15, p: 2, width: 800 }}>
      <Typography variant="h4" gutterBottom>
        FAQ's
      </Typography>
      {faqs.map(({ id, question, answer }) => {
        const isOpen = expanded.includes(id);
        return (
          <Accordion
            key={id}
            expanded={isOpen}
            onChange={() => handleToggle(id)}
          >
            <AccordionSummary
              expandIcon={
                <IconButton onClick={() => handleToggle(id)}>
                  {isOpen ? <RemoveIcon /> : <AddIcon />}
                </IconButton>
              }
              aria-controls={`faq-content-${id}`}
              id={`faq-header-${id}`}
            >
              <Box display="flex" alignItems="center" gap={2} width="300">
                <Typography variant="h5" color="textSecondary">
                  {id}
                </Typography>
                <Typography variant="subtitle1">{question}</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                bgcolor: isOpen ? "#e3f2fd" : "transparent",
                transition: "background-color 0.3s ease",
              }}
            >
              <Typography color="textSecondary">
                <span dangerouslySetInnerHTML={{ __html: answer }} />
              </Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Container>
  );
};

export default Faqs;
