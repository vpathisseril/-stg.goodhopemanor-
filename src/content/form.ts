export const formCopy = {
  name: "Your name",
  phone: "Phone number",
  email: "Email",
  relationship: "Your relationship to the person who may move in",
  contactMethod: "Best way to reach you",
  visitTimeframe: "When would you like to visit?",
  message: "Anything you'd like us to know?",
  disabledHeading: "Call to request a tour",
  disabledDetails:
    "Online tour requests are not available yet. Please call our team.",
  errorSummary: "Please fix the following",
  nameError: "Please tell us your name.",
  phoneError: "Please enter a phone number we can call, like (954) 555-0100.",
  emailError:
    "Please check the email address. It should look like name@example.com.",
  messageError: "Please keep your message under 1,000 characters.",
  networkError:
    "We couldn't send your request. Please try again, or call us.",
  sending: "Sending request…",
  successHeading: "Thank you — we've received your request",
  successBody:
    "A member of our team will contact you soon. If you'd like to talk right away, call",
  privacyLine:
    "We use this information only to reply to your request. Please don't include medical details.",
  requestTour: "Request a Tour",
  required: "(required)",
  chooseOptional: "Choose an option (optional)",
  relationshipOptions: [
    "Myself",
    "Parent",
    "Spouse/Partner",
    "Other family",
    "Friend",
    "Professional (e.g. social worker)",
  ],
  visitTimeframeOptions: [
    "As soon as possible",
    "This week",
    "Next week",
    "Within a month",
    "Just exploring",
  ],
} as const;
