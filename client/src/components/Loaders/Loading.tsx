import React, { useEffect, useState } from 'react';
import './loaders.css';

export const Loader = () => (
  <div className="loader-text">
    <h3>Loading</h3>
    <span className="loading" />
  </div>
)


const Loading = ({ delay }: { delay?: number }) => {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    return () => {
      setTimeout(() => setReady(true), delay)
    }
  }, [])

  return ready && <Loader />
}

export default Loading
