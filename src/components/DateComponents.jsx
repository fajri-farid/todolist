import React from 'react';

export const DateComponent = () => {

  let currentDate = new Date();

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  const formattedDate = currentDate.toLocaleDateString('id-ID', options);

  return (
    <div className='text-center text-lg'>
      <p>{formattedDate}</p>
    </div>
  );
};
