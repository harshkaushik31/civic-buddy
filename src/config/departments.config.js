// config/departments.config.js or lib/departments.config.js

export const DEPARTMENTS = {
  PWD: {
    slug: 'PWD',
    name: 'Public Works Department',
    shortName: 'PWD',
    fullName: 'Public Works Department (PWD)',
    color: '#EF4444', // red-500
    bgColor: '#FEF2F2', // red-50
    icon: '🏗️',
    description: 'Roads, Buildings, Infrastructure',
    categories: ['Roads', 'Buildings', 'Bridges', 'Street Lights'],
    email: 'pwd@nayaraipur.gov.in',
    phone: '+91-771-XXXXXXX'
  },
  NRDA: {
    slug: 'NRDA',
    name: 'Naya Raipur Development Authority',
    shortName: 'NRDA',
    fullName: 'Naya Raipur Development Authority (NRDA)',
    color: '#10B981', // green-500
    bgColor: '#ECFDF5', // green-50
    icon: '🏛️',
    description: 'Urban Planning & Development',
    categories: ['Planning', 'Land Development', 'Zoning', 'Approvals'],
    email: 'nrda@nayaraipur.gov.in',
    phone: '+91-771-XXXXXXX'
  },
  NRMC: {
    slug: 'NRMC',
    name: 'Naya Raipur Municipal Corporation',
    shortName: 'NRMC',
    fullName: 'Naya Raipur Municipal Corporation (NRMC)',
    color: '#8B5CF6', // violet-500
    bgColor: '#F5F3FF', // violet-50
    icon: '🏢',
    description: 'Municipal Services & Administration',
    categories: ['Sanitation', 'Property Tax', 'Licensing', 'Birth/Death Certificates'],
    email: 'nrmc@nayaraipur.gov.in',
    phone: '+91-771-XXXXXXX'
  },
  Electricity: {
    slug: 'Electricity',
    name: 'Electricity Department',
    shortName: 'Electricity',
    fullName: 'Electricity Department',
    color: '#F59E0B', // amber-500
    bgColor: '#FFFBEB', // amber-50
    icon: '⚡',
    description: 'Power Supply & Distribution',
    categories: ['Power Outage', 'New Connection', 'Billing', 'Meter Issues'],
    email: 'electricity@nayaraipur.gov.in',
    phone: '+91-771-XXXXXXX'
  },
  Water: {
    slug: 'Water',
    name: 'Water Supply Department',
    shortName: 'Water',
    fullName: 'Water Supply Department',
    color: '#06B6D4', // cyan-500
    bgColor: '#ECFEFF', // cyan-50
    icon: '💧',
    description: 'Water Supply & Management',
    categories: ['Supply Issues', 'Water Quality', 'New Connection', 'Leakage'],
    email: 'water@nayaraipur.gov.in',
    phone: '+91-771-XXXXXXX'
  },
  Traffic: {
    slug: 'Traffic',
    name: 'Traffic Police',
    shortName: 'Traffic',
    fullName: 'Traffic Police',
    color: '#DC2626', // red-600
    bgColor: '#FEE2E2', // red-100
    icon: '🚦',
    description: 'Traffic Management & Safety',
    categories: ['Signal Issues', 'Traffic Congestion', 'Parking', 'Road Safety'],
    email: 'traffic@nayaraipur.gov.in',
    phone: '+91-771-XXXXXXX'
  },
  Environment: {
    slug: 'Environment',
    name: 'Environment Department',
    shortName: 'Environment',
    fullName: 'Environment Department',
    color: '#22C55E', // green-500
    bgColor: '#F0FDF4', // green-50
    icon: '🌳',
    description: 'Environmental Protection & Management',
    categories: ['Pollution', 'Waste Management', 'Green Cover', 'Air Quality'],
    email: 'environment@nayaraipur.gov.in',
    phone: '+91-771-XXXXXXX'
  }
};

// Helper functions
export const getAllDepartments = () => Object.values(DEPARTMENTS);

export const getDepartmentBySlug = (slug) => {
  return DEPARTMENTS[slug] || null;
};

export const getDepartmentSlugs = () => {
  return Object.keys(DEPARTMENTS);
};

export const isDepartmentValid = (slug) => {
  return slug in DEPARTMENTS;
};