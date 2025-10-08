import { notFound } from "next/navigation";

type Props = {
  children: React.ReactNode;
  params: Promise<{
    lpv: string;
  }>;
};

export default async function LpvLayout({ children, params }: Props) {
  const { lpv } = await params;
  if (lpv !== "10000") {
    notFound();
  }
  return (
    <div>
        <header>
            <h1>lpv: {lpv}</h1>
        </header>
        {children}
        <footer>
            <p>Footer</p>
            <a href="http://localhost:8001" target="_blank" rel="noopener noreferrer">Manage Cache</a>
        </footer>
    </div>
  );
}