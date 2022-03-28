import React from 'react';

export interface Node {
  id: string;
  name: string;
  url: string;
  viewerSubscription: string;
  licenseInfo?: LicenseInfo;
  description: string;
}
export interface Repo {
  cursor: string;
  node: Node;
}

export interface LicenseInfo {
  spdxId?: string;
}

function RepoInfo(repo: Repo) {
  const licenseProp = (license?: LicenseInfo) => {
    switch (license?.spdxId) {
      case undefined: {
        return (
          <span
            className={'px-1 py-1 ms-1 d-inline-block btn btn-sm btn-danger'}
          >
            NO LICENSE
          </span>
        );
      }
      case 'NOASSERTION': {
        return (
          <span
            className={'px-1 py-1 ms-1 d-inline-block btn btn-sm btn-warning'}
          >
            {license?.spdxId}
          </span>
        );
      }
      default: {
        return (
          <span
            className={
              'px-1 py-1 ms-1 d-inline-block btn btn-sm btn-outline-success'
            }
          >
            {repo.node.viewerSubscription}
          </span>
        );
      }
    }
  };

  return (
    <li className="list-group-item">
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex flex-column">
          <a href={repo.node.url} className="h5 mb-0 text-decoration-none">
            {repo.node.name}
          </a>
          <p className="small">{repo.node.description}</p>
        </div>
        <div className="text-nowrap ms-3">
          {licenseProp(repo.node.licenseInfo)}
          <span
            className={
              'px-1 py-1 ms-1 d-inline-block btn btn-sm ' +
              (repo.node.viewerSubscription === 'SUBSCRIBED'
                ? 'btn-success'
                : 'btn-outline-secondary')
            }
          >
            {repo.node.viewerSubscription}
          </span>
        </div>
      </div>
    </li>
  );
}

export default RepoInfo;
