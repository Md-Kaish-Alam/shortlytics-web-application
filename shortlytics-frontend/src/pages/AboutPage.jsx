import { FaLink, FaShareAlt, FaEdit, FaChartLine } from "react-icons/fa";
const AboutPage = () => {
  return (
    <div className="lg:px-14 sm:px-8 px-5 min-h-[calc(100vh-64px)] pt-2">
      <div className="bg-white w-full sm:py-10 py-8  ">
        <h1 className="sm:text-4xl text-slate-800 text-3xl font-bold italic  mb-3">
          About Shortlytics
        </h1>
        <p className="text-gray-700 text-sm  mb-8 xl:w-[60%] lg:w-[70%] sm:w-[80%] w-full ">
          Shortlytics is a powerful and user-friendly platform that streamlines
          URL shortening for effortless and efficient sharing. With just a few
          clicks, you can generate shortened links, organize them for easy
          access, and track detailed analytics to monitor performance and
          engagement. Whether for personal use, marketing campaigns, or business
          needs, Shortlytics helps you manage your links more effectively and
          make data-driven decisions.
        </p>
        <div className="space-y-5 xl:w-[60%] lg:w-[70%] sm:w-[80%] w-full ">
          <div className="flex items-start">
            <FaLink className="text-blue-500 text-3xl mr-4" />
            <div>
              <h2 className="sm:text-2xl font-bold text-slate-800">
                Simple URL Shortening
              </h2>
              <p className="text-gray-600">
                Create short, memorable links in seconds. With an intuitive
                interface and fast setup, Shortlytics makes URL shortening
                effortless—so you can focus on sharing, not struggling with
                tools.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <FaShareAlt className="text-green-500 text-3xl mr-4" />
            <div>
              <h2 className="sm:text-2xl font-bold text-slate-800">
                Powerful Analytics
              </h2>
              <p className="text-gray-600">
                Unlock valuable insights with our comprehensive analytics
                dashboard. Monitor clicks, geographic distribution, and referral
                sources to refine your campaigns and maximize impact.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <FaEdit className="text-purple-500 text-3xl mr-4" />
            <div>
              <h2 className="sm:text-2xl font-bold text-slate-800">
                Enhanced Security
              </h2>
              <p className="text-gray-600">
                Protect your links and data with advanced encryption and robust
                security protocols. Every shortened URL is safeguarded to ensure
                privacy and reliability.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <FaChartLine className="text-red-500 text-3xl mr-4" />
            <div>
              <h2 className="sm:text-2xl font-bold text-slate-800">
                Fast and Reliable
              </h2>
              <p className="text-gray-600">
                Deliver an exceptional user experience with instant redirects
                and guaranteed high uptime. Our optimized infrastructure keeps
                your links accessible and responsive—anytime, anywhere.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
