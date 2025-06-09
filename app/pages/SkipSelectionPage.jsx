import { useEffect, useState } from "react";
import "../styles/SkipSelectionPage.css";

export default function SkipSelectionPage() {
  const [data, setData] = useState([]);
  const [selectedSkip, setSelectedSkip] = useState(null);

  const fetchData = async (url) => {
    const response = await fetch(url);
    const responseJson = await response.json();
    return responseJson;
  };

  useEffect(async () => {
    const skips = await fetchData(
      "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
    );
    console.log(skips);
    setData(skips);
  }, []);

  const skipImages = {
    small:
      "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/4-yarder-skip.jpg",
    big: "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v…object/public/skips/skip-sizes/40-yarder-skip.jpg",
  };

  const handleGetSkip = (skipId) => {
    setSelectedSkip(skipId);
  };
  console.log("selectedSkip", selectedSkip);

  // mobile size
  const [activeCardId, setActiveCardId] = useState(null);

  const toggleCard = (id) => {
    setActiveCardId((prev) => (prev === id ? null : id));
  };

  const handleButtonClick = (item) => {
    console.log("Clicked item:", item);
  };

  /**
allowed_on_road:false
allows_heavy_waste:true
area:""
created_at:"2025-04-03T13:51:40.344435"
forbidden:false
hire_period_days:14
id:15124
per_tonne_cost:248
postcode:"NR32"
price_before_vat:992
size:20
transport_cost:248
updated_at:"2025-04-07T13:16:52.434"
vat:20
 */
  /**
    <div className="flex justify-around mb-2">
            <p className="basis-40"></p>
            <p className="basis-40"></p>
            <p className="basis-40 flex items-center justify-center font-medium">
              Day hire period
            </p>
            <p className="basis-40 flex items-center justify-center font-medium">
              Cost
            </p>
          </div>
 */
  return data.length !== 0 ? (
    <>
      <div className="container mx-auto sm:px-6 lg:px-8 dark-bg">
        <div className="mb-4">
          <h1 className="flex justify-center">Choose Your Skip Size</h1>
          <h2 className="flex justify-center">
            Select the skip size that best suits your needs
          </h2>
        </div>
        <div className="">
          {data.map((item, index) => {
            const isActive = activeCardId === item.id;

            return (
              <div
                className="relative group"
                id={item.id}
                key={item.id}
                onClick={() => toggleCard(item.id)}
              >
                {/* Overlay */}
                <div className="absolute inset-0 z-10 flex justify-center overlay group-hover:overlay">
                  <button
                    name={item.id}
                    type="button"
                    className={`btn cursor-pointer self-center hidden group-hover:inline-block`}
                    onClick={() => {
                      console.log("item", item);
                      handleGetSkip(item.id);
                    }}
                  >
                    Get {item.size} Yard Skip
                  </button>
                </div>

                {/* Content */}
                <div className="relative flex justify-around mb-2 card">
                  <div className="basis-40">
                    <img src={skipImages["small"]} alt="Skip bin" />
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
