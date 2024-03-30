import React from 'react';
import {
  Lang,
} from '../../../components/lang.tsx';
import Layout from '../../../components/layout.tsx';
import Code from '../../../components/code.tsx';

const Logging = () => <Layout
  page='logging'
  path='/usage/logging'
>
  <div className='title-card'>
    <h1>Logging</h1>
    <p>
      Any logger that either implements the interface or has a wrapper is an
      option. Wrappers for pino and winston are available.
    </p>
  </div>
  <div className='card'>
    <h2>Logging levels used</h2>
    <p>
      <Lang lnkey='logging.used.description'/>
    </p>
  </div>
  <div className='card'>
    <h2>Custom Logger</h2>
    <div>
      <p>
        You can implement the logger interface below and provide any logger
        you want to next to the already provided ones.
      </p>
      <Code language='typescript'>
        {`interface Logger {
  trace(msg: string, data: Record<string, unknown>): void;
  trace(msg: string): void;
  debug(msg: string, data: Record<string, unknown>): void;
  debug(msg: string): void;
  info(msg: string, data: Record<string, unknown>): void;
  info(msg: string): void;
  warn(msg: string, data: Record<string, unknown>): void;
  warn(msg: string): void;
  error(msg: string, data: Record<string, unknown>): void;
  error(msg: string): void;
  fatal(msg: string, data: Record<string, unknown>): void;
  fatal(msg: string): void;
}`}
      </Code>
      <p>
        <Lang lnkey={'logging.custom.final'}/>
      </p>
    </div>
  </div>
</Layout>;

export default Logging;
