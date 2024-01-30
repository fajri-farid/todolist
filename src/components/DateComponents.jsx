import React from 'react';

export const DateComponent = () => {
  // Get the current date
  let currentDate = new Date();

  // Format options for day, date, month, and year
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  // Format the date as a string
  const formattedDate = currentDate.toLocaleDateString('id-ID', options);

  return (
    <div className='text-center text-lg'>
      <p>{formattedDate}</p>
    </div>
  );
};
