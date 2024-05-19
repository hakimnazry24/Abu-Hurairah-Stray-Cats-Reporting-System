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
      const res = await fetch(`http://localhost:3000/api/report/${id}`);
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
      <div className="m-20">
        <h1 className="text-4xl font-semibold mb-5">
          Report ID {report?.id} Details
        </h1>
        {}
      </div>
    </>
  );
}
