// "use client"
// import React from "react"

// export default function Dashboard() {
//     return <div>Dashboard page</div>
// }

import React from 'react';
import FormPublish from '@ui/organisms/FormPublish'; 
const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to Home Page</h1>
      <FormPublish />
    </div>
  );
};

export default HomePage;