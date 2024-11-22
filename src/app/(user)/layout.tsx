import { Footer } from "@/components/users/footer";
import { MainNavbar } from "@/components/users/nav/mainNavbar";
import { TopRibbon } from "@/components/users/nav/TopRibbon";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-full">
      <TopRibbon />
      <MainNavbar />
      {children}
      <div className="mt-auto w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
