import type { User } from "@/lib/types";

export const mockCurrentUser: User = {
  id: "user-001",
  name: "Alex Morgan",
  email: "alex@example.com",
  avatarUrl: "https://api.dicebear.com/9.x/avataaars/svg?seed=alex",
  role: "admin",
  status: "active",
  createdAt: "2024-01-15T08:00:00Z",
  bio: "Product designer passionate about clean interfaces.",
  phone: "+1 (555) 234-5678",
  location: "San Francisco, CA",
};

export const mockUsers: User[] = [
  mockCurrentUser,
  {
    id: "user-002",
    name: "Jordan Lee",
    email: "jordan@example.com",
    avatarUrl: "https://api.dicebear.com/9.x/avataaars/svg?seed=jordan",
    role: "member",
    status: "active",
    createdAt: "2024-02-10T09:30:00Z",
    location: "New York, NY",
  },
  {
    id: "user-003",
    name: "Sam Rivera",
    email: "sam@example.com",
    avatarUrl: "https://api.dicebear.com/9.x/avataaars/svg?seed=sam",
    role: "member",
    status: "active",
    createdAt: "2024-03-22T14:00:00Z",
    location: "Austin, TX",
  },
  {
    id: "user-004",
    name: "Taylor Kim",
    email: "taylor@example.com",
    avatarUrl: "https://api.dicebear.com/9.x/avataaars/svg?seed=taylor",
    role: "viewer",
    status: "pending",
    createdAt: "2024-04-05T11:00:00Z",
  },
  {
    id: "user-005",
    name: "Casey Walsh",
    email: "casey@example.com",
    avatarUrl: "https://api.dicebear.com/9.x/avataaars/svg?seed=casey",
    role: "member",
    status: "inactive",
    createdAt: "2023-11-18T16:00:00Z",
    location: "Chicago, IL",
  },
];
