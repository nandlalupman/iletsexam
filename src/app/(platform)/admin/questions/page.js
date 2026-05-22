import AdminQuestionsManager from "@/components/platform/AdminQuestionsManager";
import { getQuestions, getTests } from "@/lib/platform-data";

export default async function AdminQuestionsPage() {
  const [questions, tests] = await Promise.all([getQuestions(), getTests()]);

  return <AdminQuestionsManager initialQuestions={questions} tests={tests} />;
}
