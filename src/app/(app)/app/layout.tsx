import Header from "@/components/header";

type AppLayoutProps = {
  children: React.ReactNode;
};

export default async function AppLayout({ children }: AppLayoutProps) {
  return (
    <div>
      <Header />
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
