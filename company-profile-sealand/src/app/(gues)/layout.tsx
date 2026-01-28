import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/navigation/footer";

export default function GuestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col bg-background">
        <Navbar />
        {children}
        <Footer />
    </div>
  );
}
