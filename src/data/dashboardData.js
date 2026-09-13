export const upcomingTrip = {
  id: 1,
  destination: "Goa",
  title: "Goa Getaway",
  startDate: "20 Sep 2025",
  endDate: "25 Sep 2025",
  travelers: 4,
  budget: 45000,
  spent: 18500,
  progress: 70,
  status: "Upcoming",
};

export const trips = [
  {
    id: 1,
    title: "Goa Getaway",
    destination: "Goa",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80",
    dates: "20 Sep - 25 Sep",
    travelers: 4,
    status: "Upcoming",
  },
  {
    id: 2,
    title: "Switzerland Adventure",
    destination: "Switzerland",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80",
    dates: "10 Oct - 20 Oct",
    travelers: 2,
    status: "Planned",
  },
  {
    id: 3,
    title: "Bali Retreat",
    destination: "Bali",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    dates: "5 Nov - 12 Nov",
    travelers: 3,
    status: "Completed",
  },
];

export const activities = [
  {
    id: 1,
    title: "Beach Visit",
    time: "10:00 AM",
    location: "Goa",
    color: "#20C9D2",
  },
  {
    id: 2,
    title: "Lunch",
    time: "1:00 PM",
    location: "Goa",
    color: "#4CCB8A",
  },
  {
    id: 3,
    title: "Museum Tour",
    time: "4:00 PM",
    location: "Goa",
    color: "#3B82F6",
  },
  {
    id: 4,
    title: "Sunset Point",
    time: "6:30 PM",
    location: "Goa",
    color: "#F59E0B",
  },
];
export const budgetSummary = {
  total: 45000,
  spent: 18500,
  remaining: 26500,
  usedPercentage: 41,
};

export const expenseCategories = [
  {
    name: "Transportation",
    value: 8000,
    color: "#20C9D2",
  },
  {
    name: "Accommodation",
    value: 12000,
    color: "#F5A34A",
  },
  {
    name: "Food",
    value: 5000,
    color: "#FF7568",
  },
  {
    name: "Activities",
    value: 3500,
    color: "#8B6DE8",
  },
  {
    name: "Others",
    value: 2000,
    color: "#20BFA9",
  },
];

// Explore Destinations
export const destinations = [
  {
    id: 1,
    name: "Goa",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80",
    rating: 4.8,
    category: "Beach",
  },
  {
    id: 2,
    name: "Paris",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
    rating: 4.7,
    category: "City",
  },
  {
    id: 3,
    name: "Bali",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    rating: 4.9,
    category: "Island",
  },
  {
    id: 4,
    name: "Tokyo",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
    rating: 4.9,
    category: "Culture",
  },
  {
    id: 5,
    name: "Santorini",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
    rating: 4.8,
    category: "Luxury",
  },
];

// Documents
export const documents = [
  {
    id: 1,
    title: "Flight Tickets",
    files: 2,
    color: "#20C9D2",
  },
  {
    id: 2,
    title: "Hotel Bookings",
    files: 3,
    color: "#3B82F6",
  },
  {
    id: 3,
    title: "Travel Insurance",
    files: 1,
    color: "#4CCB8A",
  },
  {
    id: 4,
    title: "Photos",
    files: 24,
    color: "#8B6DE8",
  },
];

// Recent Activity
export const recentActivities = [
  {
    id: 1,
    title: "Added hotel booking to Goa trip",
    time: "10 mins ago",
    color: "#20C9D2",
  },
  {
    id: 2,
    title: "Expense of ₹2,500 added",
    time: "1 hour ago",
    color: "#4CCB8A",
  },
  {
    id: 3,
    title: "Itinerary updated for Day 2",
    time: "Yesterday",
    color: "#3B82F6",
  },
  {
    id: 4,
    title: "Rahul joined your trip",
    time: "Yesterday",
    color: "#FF7568",
  },
];

// Travel Statistics
export const travelStatistics = {
  tripsCompleted: 8,
  countriesVisited: 5,
  travelDays: 32,
  favoriteDestination: "Goa",
};