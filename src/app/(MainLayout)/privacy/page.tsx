/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import FeatureBook from "@/app/component/Home/FeatureBook";
import LoadingPage from "@/app/loading";
import { useGetPrivacyPolicyQuery } from "@/redux/features/others/othersApi";

import { useEffect } from "react";

export default function PrivacyPolicy() {
  const { data: privacyData, isLoading,refetch } = useGetPrivacyPolicyQuery(undefined);
  console.log("privacy data", privacyData);
    const privacyHTML = privacyData?.data?.privacyPolicy || '';
function extractH1Text(htmlString:any) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlString;
  const h1 = tempDiv.querySelector('h1');
  return h1 ? h1.textContent : '';
}
function removeH1Tag(htmlString: any) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlString;
  const h1 = tempDiv.querySelector('h1');
  if (h1) {
    h1.remove();  // h1 ট্যাগ DOM থেকে রিমুভ করা হলো
  }
  return tempDiv.innerHTML;  // বাকি HTML রিটার্ন করলাম
}
const restHTML = removeH1Tag(privacyHTML);
  const h1Text = extractH1Text(privacyHTML);
  console.log("title",h1Text);
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 5000); // Refetch every 5 seconds

    return () => clearInterval(interval); // Cleanup the interval when the component unmounts
  }, [refetch]);
  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <>
      <div className="min-h-screen text-black">
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center mb-12 text-black">{h1Text}</h1>

          <div className="space-y-8 text-black">
            {/* Dynamically Rendering Privacy Policy Content */}
             <div dangerouslySetInnerHTML={{ __html: restHTML }} />

          </div>
        </div>
      </div>

      <FeatureBook />
    </>
  );
}








