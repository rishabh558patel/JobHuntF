import Navbar from "@/components/shared/Navbar";
import UploadMandatoryNote from "@/components/shared/UploadMandatoryNote";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 mt-4">
        <UploadMandatoryNote />
      </div>
      <main className="max-w-7xl mx-auto px-4 mt-6">
        {children}
      </main>
    </>
  );
};

export default MainLayout;
