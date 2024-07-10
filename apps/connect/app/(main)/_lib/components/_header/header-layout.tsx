import { FC } from "react";

interface HeaderLayoutProps {
  children: React.ReactNode;
}

const HeaderLayout: FC<HeaderLayoutProps> = ({ children }) => {
  return (
    <header className="sticky inset-x-0 top-0 z-30 h-[60px] w-full py-3 transition-all">
      <div className="container mx-auto px-4">{children}</div>
    </header>
  );
};

export default HeaderLayout;
