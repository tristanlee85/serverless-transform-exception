// src/pages/foo.js

import React from 'react';

export async function getServerSideProps() {
  // This function runs on the server for each request
  return {
    props: {}, // You can pass props to the page if needed
  };
}

const FooPage = () => {
  return (
    <div>
      <h1>Welcome to the Foo Page</h1>
      <p>This is a simple Next.js page.</p>
    </div>
  );
};

export default FooPage;
