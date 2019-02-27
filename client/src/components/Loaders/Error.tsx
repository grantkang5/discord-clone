import React from 'react';
import './loaders.css';


const Error = ({ error }: { error: string })  => (
  <div className='loader-text'>
    <span>Oh no! Something went wrong.</span>
    <span>Please refresh and try again.</span>
  </div>
)

export default Error