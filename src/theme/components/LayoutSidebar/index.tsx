type Props = {
  sidebar: React.ReactNode;
  children: React.ReactNode;
};

export default function LayoutSidebar({ sidebar, children }: Props) {
  return (
    <div className="flex overflow-hidden h-full gap-4">
      <aside className="w-64 hidden lg:block">{sidebar}</aside>
      <section className="flex-1 overflow-auto">{children}</section>
    </div>
  );
}
