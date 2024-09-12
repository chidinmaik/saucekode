import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqData = [
  {
    question: "What is this tool for?",
    answer: "This tool allows you to download the source code of any website by simply entering its URL and previewing it."
  },
  {
    question: "How do I use the tool?",
    answer: "Enter the website's URL into the input box and click 'Preview'. Once the preview loads, you can download the website's source code as a zip file."
  },
  {
    question: "Why is my preview not loading?",
    answer: "This could be due to an invalid URL or the website's server blocking the request. Please make sure the URL is correct and accessible."
  },
  {
    question: "Can I download websites that require authentication?",
    answer: "No, this tool does not support downloading websites that require user authentication."
  },
  {
    question: "What type of websites can I download?",
    answer: "You can download publicly accessible websites. Private or login-protected websites are not supported."
  }
];

const FAQ = () => {
  return (
    <div style={{ width: '100%', marginTop: '20px' }}>
      <br></br>
      <br></br>
      <br></br>
      <Typography variant="h6" gutterBottom>
        Frequently Asked Questions
      </Typography>
      {faqData.map((faq, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            <Typography variant="h6">{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default FAQ;
