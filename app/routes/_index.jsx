import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export async function loader() {
  const tullinge = await fetch(
    `https://api.sl.se/api2/realtimedeparturesV4.json?key=${process.env.REALTIME_KEY}&siteid=${process.env.TULLINGE_SITE_ID}&timewindow=60`
  );
  const sodra = await fetch(
    `https://api.sl.se/api2/realtimedeparturesV4.json?key=${process.env.REALTIME_KEY}&siteid=${process.env.SODRA_SITE_ID}&timewindow=60`
  );

  return json({
    tullinge: await tullinge.json(),
    sodra: await sodra.json()
  })
}

export const meta = () => {
  return [
    { title: "Traffic from/to Tullinge" },
  ];
};

function deviationsStatus(deviations, journeyNumber) {
  if (deviations) {
    return deviations.map((deviation) => (
      <span
        key={journeyNumber + deviation.ImportanceLevel}
        className="bg-white p-1 font-bold text-red-600 my-2"
      >
        {deviation.Text}
      </span>
    ))
  }
  return null
}

function departureItems(item) {
  return (
    <li
      className=" flex flex-col px-2 py-1 text-lg text-white odd:bg-black/25"
      key={item.JourneyNumber}
    >
      <span className="flex justify-between">
        <span>
          {item.LineNumber} {item.Destination}
        </span>
        {item.DisplayTime}
      </span>
      {deviationsStatus(item.Deviations, item.JourneyNumber)}
    </li>
  )
}

export default function Index() {
  const { tullinge, sodra } = useLoaderData()

  const allData = [
    {
      title: 'Tullinge Station',
      trains: tullinge.ResponseData.Trains.filter((train) => train.JourneyDirection === 2),
      buses: tullinge.ResponseData.Buses.filter(bus => ["722", "723"].includes(bus.LineNumber))
    },
    {
      title: 'Södra Station',
      trains: sodra.ResponseData.Trains.filter((train) => train.JourneyDirection === 1 && ["40", "41"].includes(train.LineNumber)),
    },
  ]
  return (
    <main className="flex flex-col gap-8 p-4">
      {allData.map(item => (
        <section key={item.title} className="flex flex-col items-center gap-4">
          <h1 className="font-serif text-4xl font-bold">{item.title}</h1>

          <div className="flex flex-col gap-4 w-full items-center">
            <div className="w-full max-w-[700px] bg-sky-500 p-3">
              <h2 className="text-2xl font-bold pb-2">Tåg</h2>
              <ul>{item.trains.map((train) => departureItems(train))}</ul>
            </div>

            {item.buses && (
              <div className="w-full max-w-[700px] bg-red-500 p-3">
                <h2 className="text-2xl font-bold pb-2">Buss 722/723</h2>
                <ul>{item.buses.map((bus) => departureItems(bus))}</ul>
              </div>
            )}
          </div>
        </section>
      )
      )}
    </main>
  )
}