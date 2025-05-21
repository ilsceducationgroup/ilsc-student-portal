// Function to decode HTML content
export const createMarkup = (html?: string) => {
  if (!html) return { __html: "" };
  return { __html: html };
};
// Format date helper
export const formatDate = (dateString: string): string => {
  if (!dateString) return "";

  // Use a fixed format instead of locale-dependent formatting
  const date = new Date(dateString);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;
};

// Get initials from name
export const getInitials = (firstName: string, lastName: string): string => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`;
};
