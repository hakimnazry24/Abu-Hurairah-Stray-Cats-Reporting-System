import { useEffect, useState } from "react";
import ReportCard from "./components/ReportRow";
import type { Report } from "../../server/main";
import ReportRow from "./components/ReportRow";

export default function AdminPage() {
  const [reports, setReports] = useState<Report[]>([]);

  async function getReports() {
    try {
      const res = await fetch("http://localhost:3000/api/reports");
      const data: Report[] = await res.json();
      setReports(data);
    } catch (err) {
      console.log("cannot read report");
    }
  }

  useEffect(() => {
    getReports();
  }, []);

  return (
    <>
      <div className="m-20">
        <h1 className="mb-5 text-4xl font-semibold">Admin Panel</h1>
        <div className="flex flex-col">
          <table className="text-center border-2 border-slate-500 rounded-xl">
            <thead className="bg-sky-500 text-white font-semibold">
              <tr className="p-5">
                <th>Id</th>
                <th>Location 1</th>
                <th>Location 2</th>
                <th>Location 3</th>
                <th>Contact number</th>
                <th>Email address</th>
                <th>Description</th>
                <th>Status</th>
                <th>Date created</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <ReportRow key={report.id} {...report}></ReportRow>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
