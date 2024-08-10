import Header from "@/components/layouts/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full flex-col">
      <div className="max-w-9xl">
        <Header />
      </div>
      <div className="">{children}</div>
    </div>
  );
}
