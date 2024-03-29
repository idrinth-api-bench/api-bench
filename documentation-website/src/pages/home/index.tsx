import React from 'react';
import {
  Lang,
} from '../../components/lang.tsx';
import Layout from '../../components/layout.tsx';
import ExternalLink from '../../components/external-link.tsx';

const Index = () => <Layout
  Outlet={<>
    <div className='title-card'>
      <h1>
        <Lang lnkey='home.title'/>
      </h1>
      <p>
        This project provides a framework for testing rest-apis and websites for
        changes in response times. <br /> This helps to detect performance
        changes in code in a quick and simple manner.
      </p>
    </div>
    <div className='card'>
      <h2>Why use a Benchmark Runner?</h2>
      <p>
          Given that the amount of APIs increase by moving to microservices, we
          need a way to determine if changes to a service&apos;s
          response times are related to code changes. <br />
          For this purpose a defined load with repeatable request seems the most
          useful.
      </p>
    </div>
    <div className='card'>
      <h2>Regarding existing libraries</h2>
      <p>
          Other tools like{' '}
        <ExternalLink
          to='https://github.com/matteofigus/api-benchmark'
          label={'matteofigus/api-benchmark'}/>
        {' '},{' '}
        <ExternalLink
          to='https://github.com/bvanderlaan/api-bench-runner'
          label='bvanderlaan/api-bench-runner'
        />
        {' '},{' '} or
        <ExternalLink
          to='https://github.com/jeffbski/bench-rest'
          label='jeffbski/bench-rest'
        />{' '}
          are all untouched for quite a while and don&apos;t
          provide type definitions for typescript.
          This makes them less desirable when working with
          projects where the better static code check is a huge
          boost in development speed.<br />
          Additionally, this tool separates the validation thread from the
          thread processing the actual requests to further minimize the effect
          of complicated validations or huge response bodies on the data
          gathering.
      </p>
    </div>
  </>}
  page='home'
/>;
export default Index;
