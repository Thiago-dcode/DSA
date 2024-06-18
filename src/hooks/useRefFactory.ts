import React, { MutableRefObject, useEffect, useRef, useState } from "react";

const UseRefFactory = () => {
  const refs = useRef<MutableRefObject<null | HTMLElement>[]>([]);
  const [current, setCurrent] = useState(0);
  const next = () => {
    const ref = refs.current[current];
    setCurrent((prev) => prev + 1);
    return ref;
  };
  useEffect(() => {
    refs.current[0] = useRef(null);
  }, []);

  return {
    next,
  };
};

export default UseRefFactory;
