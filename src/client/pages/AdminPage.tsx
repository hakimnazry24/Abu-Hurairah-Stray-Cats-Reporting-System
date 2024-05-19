import { useEffect, useState } from "react";
import ReportCard from "../components/ReportRow";
import type { Report } from "../../server/main";
import ReportRow from "../components/ReportRow";
import { table } from "console";
import EmptyRow from "../components/EmptyRow";

export default function AdminPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setisLoading] = useState(true);
  const [filterOption, setFilterOption] = useState("No filter");
  const [filteredReport, setFilteredReport] = useState<Report[]>([]);

  async function getReports() {
    try {
      const res = await fetch("http://localhost:3000/api/reports");
      const data: Report[] = await res.json();
      setReports(data);
      setisLoading(false);
    } catch (err) {
      console.log("cannot read report");
    }
  }

  function filterReport() {
    if (filterOption == "Need for Review") {
      setFilteredReport(
        reports.filter((report) => report.status == "Need for Review")
      );
    } else if (filterOption == "Reviewed") {
      setFilteredReport(
        reports.filter((report) => report.status == "Reviewed")
      );
    } else if (filterOption == "Report complete") {
      setFilteredReport(
        reports.filter((report) => report.status == "Report complete")
      );
    }
  }

  useEffect(() => {
    getReports();
  }, []);

  useEffect(() => {
    filterReport();
  }, [filterOption]);

  return (
    <>
      <div className="m-20">
        <div className="flex justify-between">
          <h1 className="mb-5 text-4xl font-semibold">Admin Panel</h1>
          <div>
            <label htmlFor="status">Filter: </label>
            <select
              name="status"
              id="status"
              className="p-3 bg-blue-500 text-white font-semibold rounded-xl"
            >
              <option
                value="No filter"
                onClick={() => setFilterOption("No filter")}
              >
                No filter
              </option>
              <option
                value="Need for Review"
                onClick={() => setFilterOption("Need for Review")}
              >
                Need for Review
              </option>
              <option
                value="Reviewed"
                onClick={() => setFilterOption("Reviewed")}
              >
                Reviewed
              </option>
              <option
                value="Report complete"
                onClick={() => setFilterOption("Report complete")}
              >
                Report complete
              </option>
            </select>
          </div>
        </div>
        <div className="flex flex-col">
          {isLoading ? (
            <table className="text-center border-2 border-slate-500 rounded-xl opacity-20 animate-pulse">
            <thead className="bg-slate-500 text-white font-semibold">
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
            <EmptyRow></EmptyRow>
            <EmptyRow></EmptyRow>
            <EmptyRow></EmptyRow>
            <EmptyRow></EmptyRow>
            <EmptyRow></EmptyRow>
            </tbody>
          </table>
          ) : (
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
                {filterOption == "No filter"
                  ? reports.map((report) => (
                      <ReportRow key={report.id} {...report}></ReportRow>
                    ))
                  : filteredReport.map((report) => (
                      <ReportRow key={report.id} {...report}></ReportRow>
                    ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
