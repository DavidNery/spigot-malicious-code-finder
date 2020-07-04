import React, { useState } from 'react';

import Analyzing from '../components/analyzing';
import SelectJar from '../components/selectjar';

const Home: React.FC = () => {
  const [jar, setJar] = useState<File>();

  return (
    jar ? (
      <Analyzing jarFile={jar} reset={() => setJar(undefined)} />
    ) : (
      <SelectJar updateJar={setJar} />
    )
  );
}

export default Home;