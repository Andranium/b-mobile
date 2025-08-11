export const formatPhoneNumber = (phone: string) => {
  // Remove any non-digit characters (like +)
  const digits = phone.replace(/\D/g, '');

  // Ensure we have exactly 11 digits (1 for country code + 10 for phone number)
  if (digits.length !== 11) {
    return 'Invalid phone number';
  }

  // Extract parts: country code (1 digit), area code (3 digits), next 3 digits, last 4 digits
  const countryCode = digits[0];
  const areaCode = digits.slice(1, 4);
  const middlePart = digits.slice(4, 7);
  const lastPart1 = digits.slice(7, 9);
  const lastPart2 = digits.slice(9, 11);

  // Format: 8 (XXX) XXX-XX-XX
  return `${countryCode} (${areaCode}) ${middlePart}-${lastPart1}-${lastPart2}`;
};
