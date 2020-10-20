import React, { ReactElement } from "react";
import withDataFetching from "./withDataFetching";

interface Props {
  results?: any[];
  loading?: boolean;
  error?: any;
}

function Repositories({ loading, results, error }: Props): ReactElement {
  if (loading || error) {
    return loading ? "Loading..." : error.message;
  }

  return (
    <ul>
      {results &&
        results.map(({ id, html_url, full_name }) => (
          <li key={id}>
            <a href={html_url} target="_blank" rel="noopener noreferrer">
              {full_name}
            </a>
          </li>
        ))}
    </ul>
  );
}

export default withDataFetching({
  dataSource: "https://api.github.com/users/sindresorhus/repos",
})(Repositories);
