import fs from "node:fs";
import path from "node:path";

const rootDir = path.resolve(process.cwd());
const envPath = path.join(rootDir, ".env.local");

function readEnvFile(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  for (const line of raw.split(/\r?\n/)) {
    if (!line || line.trim().startsWith("#")) {
      continue;
    }

    const [key, ...rest] = line.split("=");
    if (!key || !rest.length) {
      continue;
    }

    const value = rest.join("=").trim();
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing ${name} in .env.local`);
  }
  return value;
}

readEnvFile(envPath);

const supabaseUrl = requireEnv("NEXT_PUBLIC_SUPABASE_URL");
const serviceRoleKey = requireEnv("SUPABASE_SERVICE_ROLE_KEY");

const mockTests = [
  {
    slug: "reading-foundations",
    title: "Academic Reading Mock 01",
    section: "Reading",
    level: "Academic",
    duration_minutes: 60,
    question_count: 24,
    description: "A full IELTS-style Academic Reading mock with three passages, mixed question types, timed answering, and instant scoring.",
    status: "live",
  },
];

const seoPages = [
  {
    page_key: "home",
    title: "IELTS.my | Premium IELTS Coaching",
    description: "IELTS.my offers intensive premium IELTS coaching with mock tests and score analytics.",
    slug: "/",
    keywords: ["IELTS coaching", "IELTS mock test", "IELTS course"],
  },
  {
    page_key: "reading-test",
    title: "IELTS Reading Mock Test | IELTS.my",
    description: "Practice IELTS Reading with timer, answer review, and score insights.",
    slug: "/tests/reading-foundations",
    keywords: ["IELTS Reading", "IELTS Reading mock test"],
  },
];

async function request(endpoint, options = {}) {
  const response = await fetch(`${supabaseUrl}/rest/v1/${endpoint}`, {
    ...options,
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=representation",
      ...(options.headers || {}),
    },
  });

  const text = await response.text();
  const json = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(json?.message || json?.hint || text || `HTTP ${response.status}`);
  }

  return json;
}

async function ensureSchemaReady() {
  const response = await fetch(`${supabaseUrl}/rest/v1/tests?select=id&limit=1`, {
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
    },
  });

  if (response.status === 404) {
    throw new Error("The database schema is not live yet. Run supabase/schema.sql in the Supabase SQL editor first.");
  }
}

async function main() {
  await ensureSchemaReady();

  await request("tests?on_conflict=slug", {
    method: "POST",
    body: JSON.stringify(mockTests),
  });

  await request("seo_pages?on_conflict=page_key", {
    method: "POST",
    body: JSON.stringify(seoPages),
  });

  console.log("Seeded tests and SEO pages into Supabase.");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
