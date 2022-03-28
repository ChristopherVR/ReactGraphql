import React, { useCallback, useEffect, useState } from 'react';
import github from './db';
import NavButtons from './NavButtons';
import query from './query';
import RepoInfo, { Repo } from './RepoInfo';
import Search from './Search';

function App() {
  const [username, setUsername] = useState<string>();
  const [repos, setRepos] = useState<Repo[]>([]);
  const [pageCount, setPageCount] = useState<number>(2);
  const [queryString, setQueryString] = useState<string>('');
  const [totalCount, setTotalCount] = useState<number | null>(null);

  const [startCursor, setStartCursor] = useState<string | null>(null);
  const [endCursor, setEndCursor] = useState<string | null>(null);
  const [hasPreviousPage, setHasPreviousPage] = useState<boolean>(false);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [paginationKeyword, setPaginationKeyWord] = useState<'first' | 'last'>(
    'first',
  );
  const [paginationString, setPaginationString] = useState<string>('');
  const fetchData = useCallback(() => {
    const queryText = JSON.stringify(
      query(pageCount, queryString, paginationKeyword, paginationString),
    );
    fetch(github.baseURL, {
      method: 'POST',
      headers: github.headers,
      body: queryText,
    })
      .then((res) => res.json())
      .then((x) => {
        if (x.data) {
          const { viewer, search } = x.data;
          setUsername(viewer.name);
          setRepos(search.edges);
          setTotalCount(search.repositoryCount);
          setStartCursor(search.pageInfo?.startCursor);
          setEndCursor(search.pageInfo?.endCursor);
          setHasPreviousPage(search.pageInfo?.hasPreviousPage);
          setHasNextPage(search.pageInfo?.hasNextPage);
          setPaginationKeyWord(search.pageInfo?.paginationKeyword);
          setPaginationString(search.pageInfo?.paginationString);
        }

        console.log(x);
      });
  }, [pageCount, paginationKeyword, paginationString, queryString]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div className="App container mt-5">
      <h1 className="text-primrary">
        <i className="bi bi-diagram-2-fill"></i> Repos
      </h1>
      <p>Hello {username}</p>
      <Search
        onQueryChange={({
          currentTarget: { value },
        }: {
          currentTarget: {
            value: string;
          };
        }) => setQueryString(value)}
        totalCount={totalCount}
        pageCount={pageCount}
        queryString={queryString}
        onTotalChange={({
          currentTarget: { value },
        }: {
          currentTarget: {
            value: string;
          };
        }) => setPageCount(Number(value))}
      ></Search>
      <NavButtons
        start={startCursor}
        end={endCursor}
        next={hasNextPage}
        previous={hasPreviousPage}
        onPage={(filter: 'first' | 'last', be: string) => {
          setPaginationKeyWord(filter);
          setPaginationString(be);
        }}
      />
      {!!repos.length && (
        <ul className="list-group list-group-flush">
          {repos.map((repo) => (
            <RepoInfo
              key={repo.node.id}
              node={repo.node}
              cursor={repo.cursor}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
