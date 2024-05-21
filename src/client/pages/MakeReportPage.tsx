import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function MakeReportPage() {
  const [selectedImage, setSelectedImage] = useState<any>();
  const navigate = useNavigate();
  async function submitReport(e: any) {
    e.preventDefault();

    const formData = new FormData(e.target);
    console.log(formData);
    // console.log(data.image)
    try {
      const toastLoad = toast.loading("Submitting report ...");
      const formData = new FormData(e.target);
      formData.append("cat_image", selectedImage);
      const res = await fetch(process.env.NODE_ENV == "development"
          ? `${process.env.DEVELOPMENT_URL!}/api/submit-report`
          : `${process.env.PRODUCTION_URL!}/api/submit-report`, {
        method: "post",
        body: formData,
      });
      await new Promise((resolve) => setTimeout(resolve, 3000)).then(() => {
        toast.dismiss(toastLoad);
      }); //fake promise for satisfaction purpose HAHA
      if (res.status == 200) {
        toast.success("Report submitted successfully");
        setTimeout(() => {
          navigate("/successful");
        }, 1000);
      } else if (res.status == 400) {
        toast.error("System not accepting report");
      } else if (res.status == 500) {
        toast.error("Something wrong in the server");
      }
    } catch (err) {
      toast.error("cannot submit report. Something is wrong ...");
    }
  }

  return (
    <>
      <div className="p-16  flex justify-center ">
        <Toaster position="top-center" />
        <div>
          <div className="border-gray-900/10 ">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Make Report
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Please fill in <span className="font-semibold">ALL</span> the
              informations. Make sure all the informations are correct.{" "}
              <span className="font-semibold text-red-500">
                The report cannot be edited once submitted
              </span>
              .
            </p>

            <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Upload Meow Photo
                </label>
                <div className="flex justify-center rounded-lg border border-dashed border-gray-900/25">
                  {selectedImage ? (
                    <div className="relative">
                      <img
                        alt="not found"
                        className="max-w-full max-h-full rounded-lg"
                        src={URL.createObjectURL(selectedImage)}
                      />
                      <button
                        onClick={() => setSelectedImage(null)}
                        className="mr-2 mb-2 p-2 rounded-xl bg-sky-400 text-white font-semibold mt-5 hover:scale-110 transition ease-in-out active:opacity-80 absolute bottom-0 right-0"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="mt-2 px-6 py-10">
                      <div className="text-center">
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-sky-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-sky-600 focus-within:ring-offset-2 hover:text-sky-500"
                          >
                            <span>Upload a file</span>
                            <input
                              required
                              id="file-upload"
                              name="cat_image"
                              type="file"
                              className="sr-only"
                              onChange={(event) => {
                                console.log(event.target.files![0]); // Log the selected file
                                setSelectedImage(event.target.files![0]); // Update the state with the selected file
                              }}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">
                          PNG, JPG up to 10MB
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <form onSubmit={submitReport} encType={"multipart/form-data"}>
            <div className="space-y-6">
              <div className="border-gray-900/10">
                {/* <input
                  required
                  className="mt-5"
                  type="file"
                  name="cat_image"
                  // Event handler to capture file selection and update the state
                  onChange={(event) => {
                    console.log(event.target.files![0]); // Log the selected file
                    setSelectedImage(event.target.files![0]); // Update the state with the selected file
                  }}
                /> */}
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                  <div className="col-span-full">
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Cat Condition
                    </label>
                    <div className="mt-2">
                      <textarea
                        name="description"
                        rows={3}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                        defaultValue={""}
                        placeholder="Describe the condition of the cat"
                      />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-gray-600">
                      Can you describe the condition of the cat?
                    </p>
                    <p className="italic text-slate-500">
                      i.e the cat is is sick, the cat has broken legs etc
                    </p>
                  </div>
                  <div className="col-span-full">
                    <label
                      htmlFor="location"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Location of The Cat
                    </label>
                    <div className="mt-2">
                      <input
                        required
                        type="text"
                        name="location_1"
                        id=""
                        placeholder="Address 1 (required)"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                      />
                      <input
                        type="text"
                        name="location_2"
                        id=""
                        placeholder="Address 2"
                        className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                      />
                      <input
                        type="text"
                        name="location_3"
                        id=""
                        placeholder="Address 3"
                        className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-gray-900/102">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Contact Information
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  We may need to contact you for further information
                </p>

                <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Contact Number
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="contact_number"
                        id="contact_number"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                        placeholder="Phone number"
                        required
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        placeholder="Email address"
                        required
                        type="email"
                        name="email_address"
                        id="email_address"
                        autoComplete="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button className="rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600">
                Submit Report
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
