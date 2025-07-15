import React from "react";

function Content() {
  return (
    <div className="bg-white bg-opacity-90 rounded-xl shadow-lg p-8 mt-[4rem] max-w-2xl w-full text-gray-800">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-black">
        Greetings from Abbvie India
      </h1>
      <p className="mb-4 text-lg leading-relaxed">
        We are pleased to share that the{" "}
        <span className="font-semibold">Investigators Meeting</span> of
        <span className="block mt-1 font-medium text-blue-800">
          “A Phase 4 Study of Venetoclax in Combination with Azacitidine in
          Indian Subjects with Newly Diagnosed Acute Myeloid Leukemia Who are
          Ineligible for Standard Induction Therapy (M23-826)”
        </span>
        is planned on <span className="font-semibold">2-3 August</span> in
        Mumbai at
        <span className="font-semibold"> ITC Maratha</span>, Chhatrapati Shivaji
        Maharaj Int&apos;l Airport Rd, near International Airport, Ashok Nagar,
        Andheri East, Mumbai, Maharashtra 400099.
      </p>
      <p className="text-lg leading-relaxed">
        To prepare ourselves and make necessary logistical arrangements, we
        request you to kindly help us with the information below to proceed
        further.
      </p>
    </div>
  );
}

export default Content;
