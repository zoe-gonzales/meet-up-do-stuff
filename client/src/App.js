import React from 'react';
import Heading from './components/Heading';
import InterestSelector from './components/InterestSelector';


function App() {
  const coding = {
    name: 'coding',
    id: 1,
  }
  return (
    <div>
      <Heading />
      <InterestSelector interest={coding} />
    </div>
  )
}

export default App;
