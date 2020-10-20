import React, { ReactElement } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import withDataFetching from "./withDataFetching";

interface Props {
  results?: any[];
  loading?: boolean;
  error?: any;
}

function Repositories({ loading, results, error }: Props): ReactElement {
  let match = useRouteMatch();

  if (loading || error) {
    return loading ? "Loading..." : error.message;
  }

  return (
    <>
      <h1>HOC</h1>
      <ul>
        {results &&
          results.map(({ item_id, name }) => (
            <Link to={`${match.url}/${item_id}`}>
              <li key={item_id}>{name ? name.en : "no Name(("}</li>
            </Link>
          ))}
      </ul>
    </>
  );
}

export default withDataFetching({
  dataSource:
    "http://census.daybreakgames.com/get/ps2/item?item_id=]1&c:limit=50&c:show=description.en,item_id,name.en,image_path",
})(Repositories);
