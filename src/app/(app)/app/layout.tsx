type AppLayoutProps = {
  children: React.ReactNode;
};

export default async function AppLayout({ children }: AppLayoutProps) {
  return (
    <div>
      <div className="w-full">{children}</div>
    </div>
  );
}
