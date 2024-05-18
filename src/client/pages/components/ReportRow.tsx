import { useState } from "react";
import { Report } from "../../../server/main";

export default function ReportRow(props: Report) {
  const [status, setStatus] = useState(props.status);

  async function changeReportStatus(
    id: number,
    status: "Need for Review" | "Reviewed" | "Report complete"
  ) {
    const data = { id: id, status: status };

    try {
      const res = await fetch("http://localhost:3000/api/change-status", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.status == 200) {
        setStatus(status);
        window.alert("Successfully change status of report");
      } else if (res.status == 500) {
        window.alert("Something wrong in the server");
      } else if (res.status == 404)
        window.alert("Report to be changed not found");
      else {
        window.alert("idk wtf is wrong");
      }
    } catch (err) {
      console.log("cannot send change status to server");
    }
  }

  return (
    <tr className="bg-slate-200 border-2 border-slate-500">
      <td>{props.id}</td>
      <td>{props.location_1}</td>
      <td>{props.location_2}</td>
      <td>{props.location_3}</td>
      <td>{props.contact_number}</td>
      <td>{props.email_address}</td>
      <td>{props.description}</td>
      <td>{props.status}</td>
      <td>{props.date_created}</td>
      <td>
        <button className="bg-sky-500 p-2 text-white font-semibold rounded-2xl mx-1">
          Details
        </button>
        {status == "Need for Review" ? (
          <button
            className="bg-orange-500 p-2 text-white font-semibold rounded-2xl mx-1"
            onClick={() => changeReportStatus(props.id, "Reviewed")}
          >
            Change status to "{status}"
          </button>
        ) : status == "Reviewed" ? (
          <button
            className="bg-orange-500 p-2 text-white font-semibold rounded-2xl mx-1"
            onClick={() => changeReportStatus(props.id, "Report complete")}
          >
            Change status to "{status}"
          </button>
        ) : (
          <span className="bg-green-500 text-white font-semibold rounded-2xl p-2">
            {status}
          </span>
        )}
      </td>
    </tr>
  );
}
