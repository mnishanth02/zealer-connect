import SideNav from "../_lib/components/side-nav";

const AthleteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    // <div className="flex flex-col">
    //   <main className="h-cover container">{children}</main>
    // </div>

    <div className="flex h-screen font-sans">
      <SideNav />
      <main className="h-cover mx-4 flex-1 overflow-y-auto">
        {/* <Navbar /> */}
        {children}
      </main>
    </div>
  );
};

export default AthleteLayout;
