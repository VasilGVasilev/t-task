// on every resize we check if query param ( examples: "(min-width: 1060px)", "(min-width: 768px)") matches the current size of desktop and if yes, we return true which as a Boolean

import { useState, useEffect } from "react";

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener); //cleanup function
  }, [matches, query]);

  return matches;
};

export default useMediaQuery;