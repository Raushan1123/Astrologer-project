/**
 * Service ID to Name mapping
 * Maps service IDs (stored in database) to human-readable service names
 */

export const SERVICE_MAP = {
  "1": "Birth Chart (Kundli) Analysis",
  "2": "Career & Business Guidance",
  "3": "Marriage & Relationship Compatibility",
  "4": "Health & Life Path Insights",
  "5": "Vastu Consultation",
  "6": "Palmistry",
  "7": "Gemstone Remedies & Sales",
  "8": "Auspicious Childbirth Timing (Muhurat)",
  "9": "Naming Ceremony",
  // Also handle full names (in case they're already stored as names)
  "Birth Chart (Kundli) Analysis": "Birth Chart (Kundli) Analysis",
  "Career & Business Guidance": "Career & Business Guidance",
  "Marriage & Relationship Compatibility": "Marriage & Relationship Compatibility",
  "Health & Life Path Insights": "Health & Life Path Insights",
  "Vastu Consultation": "Vastu Consultation",
  "Palmistry": "Palmistry",
  "Gemstone Remedies & Sales": "Gemstone Remedies & Sales",
  "Auspicious Childbirth Timing (Muhurat)": "Auspicious Childbirth Timing (Muhurat)",
  "Naming Ceremony": "Naming Ceremony",
  "Numerology": "Numerology"
};

/**
 * Get service name from service ID or name
 * @param {string} serviceIdOrName - Service ID (e.g., "1") or service name
 * @returns {string} - Human-readable service name
 */
export const getServiceName = (serviceIdOrName) => {
  if (!serviceIdOrName) {
    return "General Consultation";
  }
  
  // If it's in the map, return the mapped value
  if (SERVICE_MAP[serviceIdOrName]) {
    return SERVICE_MAP[serviceIdOrName];
  }
  
  // Otherwise, return as-is (might already be a service name)
  return serviceIdOrName;
};

/**
 * Check if a value is a service ID (number string)
 * @param {string} value - Value to check
 * @returns {boolean} - True if it's a service ID
 */
export const isServiceId = (value) => {
  return /^\d+$/.test(value);
};

