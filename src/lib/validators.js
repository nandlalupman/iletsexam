import { z } from "zod";

export const demoBookingSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(8, "Enter a valid phone number"),
  targetBand: z.string().min(1, "Select a target band"),
});

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const signupSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  phone: z.string().min(8, "Phone number is required"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const leadStatusSchema = z.object({
  status: z.enum(["new", "contacted", "enrolled", "dropped"]),
});

export const adminTestSchema = z.object({
  slug: z.string().min(3, "Slug is required"),
  title: z.string().min(3, "Title is required"),
  section: z.string().min(3, "Section is required"),
  level: z.string().min(3, "Level is required"),
  durationMinutes: z.coerce.number().int().min(10).max(180),
  questionCount: z.coerce.number().int().min(1).max(80),
  description: z.string().min(20, "Description is too short"),
  audioPath: z.string().optional().nullable(),
  audioUrl: z.string().optional().nullable(),
  status: z.enum(["draft", "live"]),
});

export const seoPageSchema = z.object({
  title: z.string().min(5, "Title is required"),
  description: z.string().min(20, "Description is too short"),
  slug: z.string().min(1, "Slug is required"),
  keywords: z.array(z.string().min(1)).min(1, "Add at least one keyword"),
});

export const siteSettingsSchema = z.object({
  siteName: z.string().min(2, "Site name is required"),
  contactEmail: z.string().email("Enter a valid contact email").or(z.literal("")),
  supportPhone: z.string().optional().default(""),
  whatsappNumber: z.string().optional().default(""),
  currency: z.string().min(2, "Currency is required"),
  coursePrice: z.string().optional().default(""),
  guaranteeText: z.string().optional().default(""),
  bookingEnabled: z.boolean(),
});

export const adminQuestionSchema = z.object({
  testId: z.string().uuid("Select a test"),
  type: z.enum(["mcq", "tfng", "fill", "short", "essay", "speaking"]),
  prompt: z.string().min(5, "Prompt is required"),
  options: z.array(z.string()).optional().default([]),
  correctAnswer: z.string().optional().default(""),
  explanation: z.string().optional().default(""),
  sortOrder: z.coerce.number().int().min(0).default(0),
});

export const contentBlockSchema = z.object({
  blockType: z.enum(["faq", "testimonial", "pricing", "blog", "result", "general"]),
  title: z.string().min(2, "Title is required"),
  body: z.string().optional().default(""),
  metadata: z.record(z.string(), z.any()).optional().default({}),
  status: z.enum(["draft", "published"]),
  sortOrder: z.coerce.number().int().min(0).default(0),
});
