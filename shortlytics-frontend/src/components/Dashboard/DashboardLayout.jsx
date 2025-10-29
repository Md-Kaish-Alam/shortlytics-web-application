import { useState } from "react";
import { FaLink } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import Loader from "../Loader";
import ShortUrlsList from "./ShortUrlsList";
import CreateShortUrlPopup from "./CreateShortUrlPopup";

import { useStoreContext } from "../../hooks/useStoreContext";
import { useFetchShortUrls, useFetchTotalClicks } from "../../hooks/useQuery";
import AnalyticsGraph from "./AnalyticsGraph";

const DashboardLayout = () => {
  const { token } = useStoreContext();
  const navigate = useNavigate();

  const [showPopUp, setShowPopUp] = useState(false);

  function onError() {
    navigate("/error/unable-to-fetch-data");
  }

  const {
    isLoadingShortUrls,
    data: shortUrls,
    refetch,
  } = useFetchShortUrls(token, onError);

  const { isLoading, data: totalClicks } = useFetchTotalClicks(token, onError);

  return (
    <div className="lg:px-14 sm:px-8 px-4 min-h-[calc(100vh-64px)]">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="lg:w-[90%] w-full mx-auto py-16">
          <div className="h-96 relative">
            {totalClicks.length === 0 && (
              <div className="absolute flex flex-col justify-center sm:items-center items-end w-full left-0 top-0 bottom-0 right-0 m-auto">
                <h1 className="text-slate-800 sm:text-2xl text-[18px] font-bold mb-1">
                  No data for this time period
                </h1>
                <h3 className="sm:w-96 w-[90%] sm:ml-0 pl-6 text-center sm:text-lg text-sm text-slate-600">
                  Share your short link to view where your engagements are
                  coming from
                </h3>
              </div>
            )}
            <AnalyticsGraph analyticsData={totalClicks} />
          </div>
          <div className="py-5 sm:text-end text-center">
            <button
              className="bg-custom-gradient px-4 py-2 rounded-md text-white"
              onClick={() => setShowPopUp(true)}
            >
              Create New Short URL
            </button>
          </div>
          <div>
            {!isLoadingShortUrls && shortUrls.length === 0 ? (
              <div className="flex justify-center pt-16">
                <div className="flex gap-2 items-center justify-center py-6 sm:px-8 px-5 rounded-md shadow-lg bg-gray-50">
                  <h1 className="text-slate-800 font-montserrat sm:text-[18px] text-[14px] font-semibold mb-1">
                    You haven&apos;t created any short link yet.
                  </h1>
                  <FaLink className="text-blue-500 sm:text-xl text-sm" />
                </div>
              </div>
            ) : (
              <ShortUrlsList data={shortUrls} />
            )}
          </div>
        </div>
      )}
      <CreateShortUrlPopup
        refetch={refetch}
        open={showPopUp}
        setOpen={setShowPopUp}
      />
    </div>
  );
};

export default DashboardLayout;
