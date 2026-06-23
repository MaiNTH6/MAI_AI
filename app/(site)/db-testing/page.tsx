import { CategoryPage } from "@/components/CategoryPage";
import { getCategory } from "@/lib/categories";

export const metadata = {
  title: getCategory("db-testing").title,
  description: getCategory("db-testing").description,
};

export default function Page() {
  return <CategoryPage slug="db-testing" />;
}
