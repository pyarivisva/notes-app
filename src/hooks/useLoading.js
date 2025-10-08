import React from "react";

function useLoading() {
  const [loading, setLoading] = React.useState(false);

  const withLoading = async (asyncFunc) => {
    setLoading(true);
    try {
      await asyncFunc();
    } finally {
      setLoading(false);
    }
  };

  return { loading, withLoading };
}

export default useLoading;
