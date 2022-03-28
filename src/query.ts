const query = (
  pageCount: number | null,
  queryString: string,
  paginationKeyword: 'first' | 'last',
  paginationString: string,
) => {
  return {
    query: `{
    viewer {
      name
    }
    search(query: "${queryString} user:ChristopherVR", type: REPOSITORY, ${paginationKeyword}: ${pageCount}, ${paginationString}) {
      repositoryCount
      edges {
        cursor
        node {
          ... on Repository {
            name
            description
            id
            url
            licenseInfo {
              spdxId
            }
          }
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
  `,
  };
};

export default query;
