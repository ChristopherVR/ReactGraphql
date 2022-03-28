import React from 'react';

type NavButtonsProps = {
  onPage: (filter: 'first' | 'last', be: string) => void;
  start: string | null;
  end: string | null;
  previous: boolean;
  next: boolean;
};

function NavButtons({ previous, onPage, start, next, end }: NavButtonsProps) {
  return (
    <div className="d-flex justify-content-center my-2">
      {previous && (
        <button
          className="btn mx-1 btn-sm btn-primary bi bi-arrow-left"
          onClick={() => onPage('last', `before '${start}'`)}
        ></button>
      )}
      {next && (
        <button
          className="btn mx-1 btn-sm btn-primary bi bi-arrow-right"
          onClick={() => onPage('first', `after '${end}'`)}
        ></button>
      )}
    </div>
  );
}

export default NavButtons;
