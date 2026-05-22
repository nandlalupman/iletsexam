import {
  buildResultSummary,
  mockDashboard,
  mockSeoPages,
  mockTests,
  readingTest,
} from "./mock-data";
import { createServiceRoleSupabaseClient } from "./supabase-server";

function mapTestRecord(record, aggregate = {}) {
  return {
    id: record.id,
    slug: record.slug,
    title: record.title,
    section: record.section,
    level: record.level || "Academic",
    durationMinutes: record.duration_minutes,
    questionCount: record.question_count || 0,
    description: record.description || "",
    audioPath: record.audio_path || "",
    audioUrl: record.audio_url || "",
    status: record.status || "draft",
    attemptCount: aggregate.attemptCount || 0,
    averageBand: aggregate.averageBand || "0.0",
  };
}

function averageBandFromAttempts(attempts = []) {
  if (!attempts.length) {
    return "0.0";
  }

  const average = attempts.reduce((sum, attempt) => sum + Number(attempt.band_score || 0), 0) / attempts.length;
  return average.toFixed(1);
}

function getPrivilegedClient() {
  return createServiceRoleSupabaseClient() || null;
}

export async function isDatabaseReady() {
  const supabase = getPrivilegedClient();
  if (!supabase) {
    return false;
  }

  const { error } = await supabase.from("tests").select("id", { head: true, count: "exact" });
  return !error;
}

export async function seedCorePlatformData() {
  const supabase = getPrivilegedClient();
  if (!supabase) {
    throw new Error("Supabase service role is not configured.");
  }

  const isReady = await isDatabaseReady();
  if (!isReady) {
    throw new Error("Run the SQL schema in Supabase before seeding platform data.");
  }

  const { error: testsError } = await supabase.from("tests").upsert(
    mockTests.map((test) => ({
      slug: test.slug,
      title: test.title,
      section: test.section,
      level: test.level,
      duration_minutes: test.durationMinutes,
      question_count: test.questionCount,
      description: test.description,
      audio_path: test.audioPath || null,
      audio_url: test.audioUrl || null,
      status: test.status,
    })),
    { onConflict: "slug" },
  );

  if (testsError) {
    throw new Error(testsError.message);
  }

  const { error: seoError } = await supabase.from("seo_pages").upsert(
    mockSeoPages.map((page) => ({
      page_key: page.page_key,
      title: page.title,
      description: page.description,
      slug: page.slug,
      keywords: page.keywords,
    })),
    { onConflict: "page_key" },
  );

  if (seoError) {
    throw new Error(seoError.message);
  }

  return { seeded: true };
}

export async function createDemoBooking(input) {
  const supabase = getPrivilegedClient();
  if (!supabase) {
    return {
      id: `demo_${Date.now()}`,
      full_name: input.fullName,
      email: input.email,
      phone: input.phone,
      target_band: input.targetBand,
      status: "new",
      source: "landing-page",
      created_at: new Date().toISOString(),
      mode: "demo-fallback",
    };
  }

  const { data, error } = await supabase
    .from("demo_bookings")
    .insert({
      full_name: input.fullName,
      email: input.email,
      phone: input.phone,
      target_band: input.targetBand,
      status: "new",
      source: "landing-page",
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getDemoBookings() {
  const supabase = getPrivilegedClient();
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("demo_bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateDemoBookingStatus(id, status) {
  const supabase = getPrivilegedClient();
  if (!supabase) {
    throw new Error("Supabase service role is not configured.");
  }

  const { data, error } = await supabase
    .from("demo_bookings")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getDashboardSnapshot() {
  return mockDashboard;
}

export async function getTests() {
  const supabase = getPrivilegedClient();
  if (!supabase) {
    return [];
  }

  const [{ data: tests, error: testsError }, { data: attempts, error: attemptsError }] = await Promise.all([
    supabase.from("tests").select("*").order("created_at", { ascending: false }),
    supabase.from("attempts").select("test_id, band_score"),
  ]);

  if (testsError) {
    throw new Error(testsError.message);
  }

  if (attemptsError) {
    throw new Error(attemptsError.message);
  }

  if (!tests?.length) {
    return [];
  }

  return tests.map((record) => {
    const relatedAttempts = attempts.filter((attempt) => attempt.test_id === record.id);
    return mapTestRecord(record, {
      attemptCount: relatedAttempts.length,
      averageBand: averageBandFromAttempts(relatedAttempts),
    });
  });
}

export async function upsertTest(input, id) {
  const supabase = getPrivilegedClient();
  if (!supabase) {
    throw new Error("Supabase service role is not configured.");
  }

  const payload = {
    slug: input.slug,
    title: input.title,
    section: input.section,
    level: input.level,
    duration_minutes: input.durationMinutes,
    question_count: input.questionCount,
    description: input.description,
    audio_path: input.audioPath || null,
    audio_url: input.audioUrl || null,
    status: input.status,
  };

  let query = supabase.from("tests");
  if (id) {
    query = query.update(payload).eq("id", id);
  } else {
    query = query.insert(payload);
  }

  const { data, error } = await query.select().single();

  if (error) {
    throw new Error(error.message);
  }

  return mapTestRecord(data);
}

export async function getTestBySlug(slug) {
  if (slug === readingTest.slug) {
    return readingTest;
  }

  const supabase = getPrivilegedClient();
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase.from("tests").select("*").eq("slug", slug).maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data ? mapTestRecord(data) : null;
}

async function ensureProfile(access) {
  const supabase = getPrivilegedClient();
  if (!supabase || !access?.id) {
    return;
  }

  const { error } = await supabase.from("profiles").upsert({
    id: access.id,
    email: access.email,
    full_name: access.fullName,
    phone: access.phone,
    role: access.role || "student",
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function scoreReadingSubmission(answers, access) {
  const result = buildResultSummary(answers);
  const supabase = getPrivilegedClient();

  if (!supabase) {
    return result;
  }

  await ensureProfile(access);

  const { data: testRecord } = await supabase.from("tests").select("id").eq("slug", readingTest.slug).maybeSingle();
  const { data: attempt, error } = await supabase
    .from("attempts")
    .insert({
      user_id: access?.id || null,
      test_id: testRecord?.id || null,
      section: result.section,
      band_score: Number(result.bandScore),
      correct_count: result.correctCount,
      total_objective: result.totalObjective,
      result_payload: result,
    })
    .select("id")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return {
    ...result,
    attemptId: attempt.id,
  };
}

export async function getAttemptResult(attemptId) {
  const supabase = getPrivilegedClient();
  if (!supabase) {
    return {
      ...buildResultSummary({}),
      attemptId,
    };
  }

  const { data, error } = await supabase
    .from("attempts")
    .select("result_payload")
    .eq("id", attemptId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data?.result_payload || null;
}

export async function getSeoPages() {
  const supabase = getPrivilegedClient();
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase.from("seo_pages").select("*").order("page_key");

  if (error) {
    throw new Error(error.message);
  }

  if (!data?.length) {
    return [];
  }

  return data.map((page) => ({
    ...page,
    seoScore: Math.min(
      100,
      45 +
        Math.min((page.title?.length || 0) / 2, 20) +
        Math.min((page.description?.length || 0) / 4, 25) +
        Math.min((page.keywords?.length || 0) * 4, 10),
    ),
  }));
}

export async function updateSeoPage(id, input) {
  const supabase = getPrivilegedClient();
  if (!supabase) {
    throw new Error("Supabase service role is not configured.");
  }

  const { data, error } = await supabase
    .from("seo_pages")
    .update({
      title: input.title,
      description: input.description,
      slug: input.slug,
      keywords: input.keywords,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getContentBlocks() {
  const supabase = getPrivilegedClient();
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("content_blocks")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("updated_at", { ascending: false });

  if (error) {
    if (error.code === "42P01" || error.code === "PGRST205") {
      return [];
    }

    throw new Error(error.message);
  }

  return data.map((item) => ({
    id: item.id,
    blockType: item.block_type,
    title: item.title,
    body: item.body || "",
    metadata: item.metadata || {},
    status: item.status,
    sortOrder: item.sort_order,
    updatedAt: item.updated_at,
  }));
}

export async function upsertContentBlock(input, id) {
  const supabase = getPrivilegedClient();
  if (!supabase) {
    throw new Error("Supabase service role is not configured.");
  }

  const payload = {
    block_type: input.blockType,
    title: input.title,
    body: input.body || null,
    metadata: input.metadata || {},
    status: input.status,
    sort_order: input.sortOrder,
    updated_at: new Date().toISOString(),
  };

  let query = supabase.from("content_blocks");
  if (id) {
    query = query.update(payload).eq("id", id);
  } else {
    query = query.insert(payload);
  }

  const { data, error } = await query.select().single();

  if (error) {
    throw new Error(error.message);
  }

  return {
    id: data.id,
    blockType: data.block_type,
    title: data.title,
    body: data.body || "",
    metadata: data.metadata || {},
    status: data.status,
    sortOrder: data.sort_order,
    updatedAt: data.updated_at,
  };
}

export async function deleteContentBlock(id) {
  const supabase = getPrivilegedClient();
  if (!supabase) {
    throw new Error("Supabase service role is not configured.");
  }

  const { error } = await supabase.from("content_blocks").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return { id };
}

export async function getQuestions() {
  const supabase = getPrivilegedClient();
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("questions")
    .select("*, tests(title, slug, section)")
    .order("sort_order", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data.map((question) => ({
    id: question.id,
    testId: question.test_id,
    testTitle: question.tests?.title || "Unknown test",
    testSlug: question.tests?.slug || "",
    testSection: question.tests?.section || "",
    type: question.type,
    prompt: question.prompt,
    options: question.options || [],
    correctAnswer: question.correct_answer || "",
    explanation: question.explanation || "",
    sortOrder: question.sort_order,
  }));
}

export async function upsertQuestion(input, id) {
  const supabase = getPrivilegedClient();
  if (!supabase) {
    throw new Error("Supabase service role is not configured.");
  }

  const payload = {
    test_id: input.testId,
    type: input.type,
    prompt: input.prompt,
    options: input.options?.filter(Boolean) || [],
    correct_answer: input.correctAnswer || null,
    explanation: input.explanation || null,
    sort_order: input.sortOrder,
  };

  let query = supabase.from("questions");
  if (id) {
    query = query.update(payload).eq("id", id);
  } else {
    query = query.insert(payload);
  }

  const { data, error } = await query.select().single();

  if (error) {
    throw new Error(error.message);
  }

  return {
    id: data.id,
    testId: data.test_id,
    type: data.type,
    prompt: data.prompt,
    options: data.options || [],
    correctAnswer: data.correct_answer || "",
    explanation: data.explanation || "",
    sortOrder: data.sort_order,
  };
}

export async function deleteQuestion(id) {
  const supabase = getPrivilegedClient();
  if (!supabase) {
    throw new Error("Supabase service role is not configured.");
  }

  const { error } = await supabase.from("questions").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return { id };
}

function mapSiteSettings(record) {
  if (!record) {
    return null;
  }

  return {
    siteName: record.site_name || "",
    contactEmail: record.contact_email || "",
    supportPhone: record.support_phone || "",
    whatsappNumber: record.whatsapp_number || "",
    currency: record.currency || "EUR",
    coursePrice: record.course_price || "",
    guaranteeText: record.guarantee_text || "",
    bookingEnabled: Boolean(record.booking_enabled),
    updatedAt: record.updated_at,
  };
}

export async function getSiteSettings() {
  const supabase = getPrivilegedClient();
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase.from("site_settings").select("*").eq("id", "main").maybeSingle();

  if (error) {
    if (error.code === "42P01" || error.code === "PGRST205") {
      return null;
    }

    throw new Error(error.message);
  }

  return mapSiteSettings(data);
}

export async function upsertSiteSettings(input) {
  const supabase = getPrivilegedClient();
  if (!supabase) {
    throw new Error("Supabase service role is not configured.");
  }

  const { data, error } = await supabase
    .from("site_settings")
    .upsert({
      id: "main",
      site_name: input.siteName,
      contact_email: input.contactEmail || null,
      support_phone: input.supportPhone || null,
      whatsapp_number: input.whatsappNumber || null,
      currency: input.currency,
      course_price: input.coursePrice || null,
      guarantee_text: input.guaranteeText || null,
      booking_enabled: input.bookingEnabled,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapSiteSettings(data);
}

export async function getAdminUsers() {
  const supabase = getPrivilegedClient();
  if (!supabase) {
    return [];
  }

  const [{ data: profiles, error: profilesError }, { data: attempts, error: attemptsError }] = await Promise.all([
    supabase.from("profiles").select("*").order("created_at", { ascending: false }),
    supabase.from("attempts").select("user_id, band_score, created_at").order("created_at", { ascending: false }),
  ]);

  if (profilesError) {
    throw new Error(profilesError.message);
  }

  if (attemptsError) {
    throw new Error(attemptsError.message);
  }

  return profiles.map((profile) => {
    const userAttempts = attempts.filter((attempt) => attempt.user_id === profile.id);
    return {
      id: profile.id,
      fullName: profile.full_name || "Unnamed student",
      email: profile.email,
      phone: profile.phone || "-",
      role: profile.role,
      testsTaken: userAttempts.length,
      latestBand: userAttempts[0]?.band_score ? Number(userAttempts[0].band_score).toFixed(1) : "-",
      joinedAt: profile.created_at,
    };
  });
}

export async function getAttemptFeed() {
  const supabase = getPrivilegedClient();
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("attempts")
    .select("id, section, band_score, correct_count, total_objective, created_at, user_id")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

function buildScoreDistribution(attempts = []) {
  const buckets = [
    { band: "8.0+", min: 8, count: 0 },
    { band: "7.0 - 7.5", min: 7, max: 7.5, count: 0 },
    { band: "6.0 - 6.5", min: 6, max: 6.5, count: 0 },
    { band: "Below 6.0", max: 5.5, count: 0 },
  ];

  attempts.forEach((attempt) => {
    const score = Number(attempt.band_score || 0);
    const bucket = buckets.find((item) => {
      if (item.min && !item.max) {
        return score >= item.min;
      }
      if (!item.min && item.max) {
        return score <= item.max;
      }
      return score >= item.min && score <= item.max;
    });

    if (bucket) {
      bucket.count += 1;
    }
  });

  return buckets.map((bucket) => ({
    band: bucket.band,
    count: bucket.count,
    percent: attempts.length ? Math.round((bucket.count / attempts.length) * 100) : 0,
  }));
}

export async function getAdminOverview() {
  const supabase = getPrivilegedClient();
  if (!supabase) {
    return null;
  }

  const [
    { count: studentCount },
    { count: leadCount },
    { count: attemptCount },
    { data: latestLeads },
    { data: tests },
    { data: seoPages },
    { data: attempts },
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("demo_bookings").select("*", { count: "exact", head: true }),
    supabase.from("attempts").select("*", { count: "exact", head: true }),
    supabase.from("demo_bookings").select("*").order("created_at", { ascending: false }).limit(4),
    supabase.from("tests").select("*").order("created_at", { ascending: false }).limit(6),
    supabase.from("seo_pages").select("*").limit(6),
    supabase.from("attempts").select("band_score"),
  ]);

  return {
    studentCount: studentCount || 0,
    leadCount: leadCount || 0,
    attemptCount: attemptCount || 0,
    revenue: 0,
    latestLeads: latestLeads || [],
    tests: tests || [],
    seoPages: seoPages || [],
    scoreDistribution: buildScoreDistribution(attempts || []),
  };
}
