import Footer from "./_components/Footer";
import ScreenMode from "./_components/ScreenMode";

export default function Settings() {
  return (
    <div className="p-3 flex gap-3 flex-col items-center">
      <ScreenMode />
      <Footer />
    </div>
  );
}
