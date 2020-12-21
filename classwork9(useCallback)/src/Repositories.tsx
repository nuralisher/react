import React, { ReactElement, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import withDataFetching from "./withDataFetching";

interface Props {
  results?: any[];
  loading?: boolean;
  error?: any;
}

function Repositories({ loading, results, error }: Props): ReactElement {
  const match = useRouteMatch();
  const [utc, setUtc] = useState("");

  if (loading || error) {
    return loading ? "Loading..." : error.message;
  }

  getUtcData();

  return (
    <>
      <h1>HOC</h1>
      <h3>{utc}</h3>
      <ul>
        {results &&
          results.map(({ item_id, name }) => (
            <Link key={item_id} to={`${match.url}/${item_id}`}>
              <li>{name ? name.en : "no Name(("}</li>
            </Link>
          ))}
      </ul>
    </>
  );

  async function getUtcData() {
    const moment = (await import("moment")).default;
    setUtc((prevUtc) => (prevUtc = moment().utc().format("hh:mm:ss")));
  }
}

export default withDataFetching({
  dataSource:
    "http://census.daybreakgames.com/get/ps2/item?item_id=]1&c:limit=50&c:show=description.en,item_id,name.en,image_path",
})(Repositories);
