import { useEffect, useState } from "react";
import { Report } from "../../server/main";
import { useParams } from "react-router-dom";
type ReportDetailsType = {
  id: number;
};

export default function ReportDetailsPage() {
  const params = useParams();
  const id = params.id;
  const [report, setReport] = useState<Report>();
  const [isLoading, setisLoading] = useState(true);
  async function getReport(id: string) {
    try {
      const res = await fetch(
        process.env.NODE_ENV == "development"
          ? `${process.env.DEVELOPMENT_URL!}/api/report/${id}`
          : `${process.env.PRODUCTION_URL!}/api/report/${id}`
      );
      const data: Report = await res.json();

      if (res.status == 200) {
        setReport(data);
        setisLoading(false);
      } else if (res.status == 404) {
        window.alert(`Report ID ${id} not found`);
      } else if (res.status == 500) {
        window.alert("something wrong in the server");
      }
    } catch (err) {
      window.alert(err);
    }
  }

  useEffect(() => {
    getReport(id!);
  }, []);

  return (
    <>
      <div className="mx-20 my-10">
        <div className="mb-5">
          <h1 className="text-4xl font-semibold mb-3">
            Report ID {report?.id} Details
          </h1>
          <div className="mb-1">
            <p className="text-lg font-semibold">Status:</p>
            <p
              className={`inline-block text-white font-semibold p-3 rounded-2xl ${
                report?.status == "Need for Review" ||
                report?.status == "Reviewed"
                  ? "bg-orange-500"
                  : "bg-green-500"
              }`}
            >
              {report?.status}
            </p>
          </div>
          <div>
            <p className="text-lg font-semibold">Date created:</p>
            <p>{report?.date_created}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-20">
          <div className="col-span-1">
            <img
              src="data:image/jpeg;base64,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"
              alt="cat image not found"
              className="w-full rounded-xl"
            />
          </div>
          <div>
            <div className="mb-10">
              <p className="text-lg font-semibold">Location 1:</p>
              <p className="mb-5">{report?.location_1}</p>
              <p className="text-lg font-semibold">Location 2:</p>
              <p className="mb-5">{report?.location_2}</p>
              <p className="text-lg font-semibold">Location 3:</p>
              <p className="mb-5">{report?.location_3}</p>
            </div>
            <div className="flex gap-5 justify-between mb-10">
              <div>
                <p>
                  <span className="text-lg font-semibold">Contact:</span>{" "}
                </p>
                <p>{report?.contact_number}</p>
              </div>
              <div>
                <p>
                  <span className="text-lg font-semibold">Email address:</span>{" "}
                </p>
                <p>{report?.email_address}</p>
              </div>
            </div>
            <div>
              <p className="text-lg font-semibold">Description: </p>
              <p>{report?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
