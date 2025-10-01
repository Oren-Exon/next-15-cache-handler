import { notFound } from "next/navigation";

export const revalidate = 500;

export async function generateStaticParams() {
  return [];
}

type PageProps = {
  params: Promise<{
    keyword: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { keyword } = await params;
  const res = await fetch(`${process.env.MOCK_API_URL}/count/${keyword}`);
  if (!res.ok) {
    notFound();
  }
  const data = await res.text();
  return <div>
    <pre>{data}</pre>
  </div>;
}