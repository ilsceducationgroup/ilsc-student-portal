// Function to decode HTML content
export const createMarkup = (html?: string) => {
  if (!html) return undefined;
  return { __dangerouslySetInnerHTML: { __html: html } };
};

// Format date helper
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString();
};

// Get initials from name
export const getInitials = (firstName: string, lastName: string): string => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`;
};
