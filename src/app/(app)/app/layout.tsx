type AppLayoutProps = {
  children: React.ReactNode;
};

export default async function AppLayout({ children }: AppLayoutProps) {
  return (
    <div>
      <div className="w-full bg-stone-800">{children}</div>
    </div>
  );
}
