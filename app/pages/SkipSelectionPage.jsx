import { useEffect, useState } from "react";
import "../styles/SkipSelectionPage.css";
import skipImages from "../assets/skipImages.jsx";
import component from "../components/SkipSelectionPage.jsx";
console.log({ component });
export default function SkipSelectionPage() {
  const [data, setData] = useState([]);
  const [selectedSkip, setSelectedSkip] = useState(null);

  const fetchData = async (url) => {
    const response = await fetch(url);
    const responseJson = await response.json();
    return responseJson;
  };

  useEffect(async () => {
    try {
      const skips = await fetchData(
        "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
      );
      console.log(skips);
      setData(skips);
    } catch (err) {
      console.error("Error fetching skips:", err);
    }
  }, []);

  const handleGetSkip = (skipId) => {
    setSelectedSkip(skipId);
  };
  console.log("selectedSkip", selectedSkip);
  return data.length !== 0 ? (
    <>
      <div className="container mx-auto sm:px-6 lg:px-8 dark-bg">
        <component.PageHeader />
        <div className="">
          {data.map((item, index) => {
            const isActive = selectedSkip === item.id;

            return (
              <div
                className="relative group sm:mb-2"
                id={item.id}
                key={item.id}
              >
                {/* Overlay */}
                <div className="absolute inset-0 z-10 lg:flex justify-center overlay group-hover:overlay">
                  <component.Button
                    id={item.id}
                    className={`btn cursor-pointer self-center hidden group-hover:inline-block`}
                    onClick={() => {
                      console.log("item", item);
                      handleGetSkip(item.id);
                    }}
                  >
                    Get {item.size} Yard Skip
                  </component.Button>
                </div>

                {/* Content */}
                <div className="relative flex justify-around lg:mb-2 card">
                  <div className="basis-40">
                    <img src={skipImages("small")} alt="Skip bin" />
                  </div>
                  <div className="basis-40 flex items-center justify-center">
                    <p className="font-bold">{item.size} Yard Skip</p>
                  </div>
                  <div className="basis-40 flex justify-center">
                    {index == 0 ? (
                      <p className="font-medium self-start">Day hire period</p>
                    ) : null}
                    <p className="self-center">{item.hire_period_days}</p>
                  </div>
                  <div className="basis-40 flex justify-center">
                    {index == 0 ? (
                      <span className="font-medium">Cost</span>
                    ) : null}
                    <p className="self-center">
                      $ {" " + item.price_before_vat}
                    </p>
                  </div>
                </div>
                <div className={`lg:hidden`}>
                  <button
                    type="button"
                    className={`cursor-pointer w-full  ${
                      isActive ? "btn-small-active" : "border-1"
                    }`}
                    onClick={() => {
                      console.log("item", item, selectedSkip);
                      handleGetSkip(item.id);
                    }}
                  >
                    Get Skip
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  ) : (
    "...loading"
  );
}
