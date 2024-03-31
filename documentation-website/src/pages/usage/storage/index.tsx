import React from 'react';
import {
  Lang,
} from '../../../components/lang.tsx';
import Layout from '../../../components/layout.tsx';
import Code from '../../../components/code.tsx';

const Storage = () => <Layout
  page='storage'
  path='/usage/storage'
>
  <div className='title-card'>
    <h1>Storage</h1>
    <p>
      <Lang lnkey='storage.description'/>
    </p>
  </div>
  <div className='card'>
    <h2>Custom Storage</h2>
    <div>
      <p>
        <Lang lnkey='storage.custom.description'/>
      </p>
      <Code language='typescript'>
        {`interface Storage
{
  store(data: FinishedSet, now: Date): void;
}`}
      </Code>
    </div>
  </div>
</Layout>;
export default Storage;
