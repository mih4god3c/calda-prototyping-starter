/**
 * Shared TypeScript types used across the prototype.
 * Add domain-specific types here as the prototype grows.
 */

export type UserRole = "admin" | "member" | "viewer" | "guest";

export type UserStatus = "active" | "inactive" | "pending" | "suspended";

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  bio?: string;
  phone?: string;
  location?: string;
}

export type NotificationType =
  | "message"
  | "mention"
  | "like"
  | "follow"
  | "update"
  | "alert"
  | "success";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
  avatarUrl?: string;
}

export type TransactionStatus = "completed" | "pending" | "failed" | "refunded";

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  currency: string;
  status: TransactionStatus;
  date: string;
  category: string;
  description?: string;
}

export interface Address {
  id: string;
  label: string;
  line1: string;
  line2?: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export interface ScreenMeta {
  name: string;
  description: string;
  href: string;
  device: "mobile" | "web";
  category: string;
}
