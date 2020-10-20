import React, { ReactElement } from "react";
import useDataFetching from "./useDataFetching";

interface Props {}

export default function RepositoriesHooks({}: Props): ReactElement {
  const { loading, results, error } = useDataFetching({
    dataSource: "https://api.github.com/users/sindresorhus/repos",
  });

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
