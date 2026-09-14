export const adminStats = {
  totalUsers: 1248,
  totalTrips: 386,
  destinations: 74,
  totalRevenue: 842500,
};

export const userAnalytics = {
  travelers: 1086,
  groupAdmins: 138,
  administrators: 24,
};

export const tripAnalytics = {
  planned: 142,
  ongoing: 38,
  completed: 206,
};

export const popularDestinations = [
  {
    id: 1,
    name: 'Goa',
    country: 'India',
    trips: 86,
    icon: '🌴',
  },
  {
    id: 2,
    name: 'Manali',
    country: 'India',
    trips: 64,
    icon: '🏔️',
  },
  {
    id: 3,
    name: 'Kerala',
    country: 'India',
    trips: 52,
    icon: '🌿',
  },
  {
    id: 4,
    name: 'Jaipur',
    country: 'India',
    trips: 41,
    icon: '🏰',
  },
];

export const recentUsers = [
  {
    id: 1,
    name: 'Aarav Sharma',
    email: 'aarav@example.com',
    role: 'Traveler',
    joined: '10 minutes ago',
    icon: '👤',
  },
  {
    id: 2,
    name: 'Priya Nair',
    email: 'priya@example.com',
    role: 'Group Admin',
    joined: '35 minutes ago',
    icon: '👥',
  },
  {
    id: 3,
    name: 'Rahul Kumar',
    email: 'rahul@example.com',
    role: 'Traveler',
    joined: '2 hours ago',
    icon: '👤',
  },
  {
    id: 4,
    name: 'Sneha Reddy',
    email: 'sneha@example.com',
    role: 'Traveler',
    joined: 'Yesterday',
    icon: '👤',
  },
];

export const platformActivity = [
  {
    id: 1,
    title: 'New trip created',
    description: 'Goa Escape was created by a traveler.',
    time: '12 minutes ago',
    icon: '✈️',
  },
  {
    id: 2,
    title: 'New group created',
    description: 'Himalayan Explorers has 5 members.',
    time: '1 hour ago',
    icon: '👥',
  },
  {
    id: 3,
    title: 'Destination added',
    description: 'Jaipur was added to the destination catalog.',
    time: '3 hours ago',
    icon: '🌍',
  },
  {
    id: 4,
    title: 'Report generated',
    description: 'Monthly platform report is ready.',
    time: 'Yesterday',
    icon: '📊',
  },
];

export const monthlyRevenue = [
  { month: 'Jan', amount: 58000 },
  { month: 'Feb', amount: 72000 },
  { month: 'Mar', amount: 64000 },
  { month: 'Apr', amount: 91000 },
  { month: 'May', amount: 108000 },
  { month: 'Jun', amount: 126000 },
  { month: 'Jul', amount: 138000 },
  { month: 'Aug', amount: 185500 },
];