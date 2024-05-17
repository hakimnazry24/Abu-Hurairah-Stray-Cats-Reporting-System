import { useState } from "react";

export default function MakeReportPage() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <div className="p-16  flex justify-center ">     
        <div>
            <h1 className="text-3xl mb-2 text-center font-semibold">Make report</h1>
            <p>Please fill in <span className="font-semibold">ALL</span> the informations. Make sure all the informations are correct. <span className="font-semibold text-red-500">The report cannot be edited once submitted</span>.</p>
            <div className="md:lg:w-1/2 ">
                {selectedImage ? (
                  <div className="">
                    <img
                      alt="not found"
                      width={"250px"}
                      src={URL.createObjectURL(selectedImage)}
                    />
                    <button onClick={() => setSelectedImage(null)} className="p-3 rounded-xl bg-sky-400 text-white font-semibold mt-5 hover:scale-110 transition ease-in-out active:opacity-80">Remove</button>
                  </div>
                ) : <div className="h-60 flex justify-center items-center border-4 rounded-2xl mt-10">
                    <p className="">Image will appear here</p>
                </div>}
            </div>
            <input
            required
            className="mt-5"
              type="file"
              name="myImage"
              // Event handler to capture file selection and update the state
              onChange={(event) => {
                console.log(event.target.files[0]); // Log the selected file
                setSelectedImage(event.target.files[0]); // Update the state with the selected file
              }}
            />
            <div className="mt-5">
                <p>Location of the photo:</p>
                <input type="text" name="location_1" id="" className="border-2 border-slate-500 rounded-xl p-2 block mb-2 md:lg:w-96" placeholder="Address 1 (required)" required/>
                <input type="text" name="location_2" id="" className="border-2 border-slate-500 rounded-xl p-2 block mb-2 md:lg:w-96" placeholder="Address 2"/>
                <input type="text" name="location_3" id="" className="border-2 border-slate-500 rounded-xl p-2 block mb-2 md:lg:w-96" placeholder="Address 3"/>
            </div>
            <div className="flex flex-nowrap gap-5">
                <div>
                    <p className="mt-5">Contact number</p>
                    <input type="text" name="contact_number" id="contact_number" className="border-2 border-slate-500 rounded-xl p-2 " style={{width: "20rem"}} placeholder="Phone number" required/>
                </div>
                <div>
                    <p className="mt-5">Email address</p>
                    <input type="text" name="email_address" id="email_address" className="border-2 border-slate-500 rounded-xl p-2 " style={{width: "20rem"}} placeholder="Email address" required/>
                </div>

            </div>
                <div className="mt-5">
                    <p >Can you describe the condition of the cat?</p>
                    <p className="italic text-slate-500">i.e the cat is is sick, the cat has broken legs etc</p>
                    <textarea name="description" id="description" cols={30} rows={10} className="w-full border-2 border-slate-500 rounded-xl p-3 mt-2" style={{resize: "none"}} placeholder="Describe the condition of the cat"></textarea>
                </div>

              
                <button className="p-3 rounded-xl bg-sky-400 text-white font-semibold mt-5 hover:scale-110 transition ease-in-out active:opacity-80">Submit report</button>
              
        </div>

      </div>
    </>
  );
}
