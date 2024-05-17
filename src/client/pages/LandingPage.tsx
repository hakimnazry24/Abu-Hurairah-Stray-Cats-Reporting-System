import { Link } from "react-router-dom";

export default function LandingPage() {

    
  return (
    <>
      <div className="flex flex-col text-center justify-center items-center h-screen">
        <div className="mb-5">
          <h3 className="text-2xl">Abu Hurairah Club</h3>
          <h1 className="text-5xl font-semibold">
            Stray Cats Reporting System
          </h1>
        </div>
        <p className="text-slate-500">
          A platform for IIUM community to direct their reports regarding stray
          cats to Abu Hurairah club.
        </p>
        <Link to={"/make-report"}>
            <button className="p-3 rounded-xl bg-sky-400 text-white font-semibold mt-5 hover:scale-110 transition ease-in-out active:opacity-80">
              Make report
            </button>
        </Link>
      </div>
    </>
  );
}
