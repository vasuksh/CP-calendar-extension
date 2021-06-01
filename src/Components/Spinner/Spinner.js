import React from 'react';
import spinner from '../../assests/spinner.gif';

export default () => {
  return (
    <div>
      <img
        src={spinner}
        style={{ width: '500px', marginTop:"0", display: 'block' }}
        alt="Loading..."
      />
    </div>
  );
};