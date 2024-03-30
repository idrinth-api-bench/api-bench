import React from 'react';
import Layout from '../../../components/layout.tsx';
import {
  Lang,
} from '../../../components/lang.tsx';
import bjoernbuettner from '../../../assets/sponsors/bjoernbuettner.png';
import jungwild from '../../../assets/sponsors/jungwild.png';
import ExternalLink from '../../../components/external-link.tsx';

const Index = () => <Layout
  page='sponsors'
  path='/contributing/sponsors'
>
  <section>
    <div className='title-card'>
      <h1>
        <Lang lnkey='sponsors.title'/>
      </h1>
      <p>
        <Lang lnkey='sponsors.description'/>
      </p>
    </div>
    <div className={'card sponsor'}>
      <img
        src={bjoernbuettner}
        alt={'Björn Büttner\'s Backing'}
      />
      <div>
        <h2>
          <ExternalLink
            to='https://bjoern-buettner.me'
            label={'Björn Büttner'}
          />
        </h2>
        <p><Lang lnkey='sponsors.bjoernbuettner.intro'/></p>
        <p><Lang lnkey='sponsors.bjoernbuettner.sponsoring'/></p>
      </div>
    </div>
    <div className={'card sponsor'}>
      <img
        src={jungwild}
        alt={'JUNGWILD'}
      />
      <div>
        <h2>
          <ExternalLink
            to='https://jungwild.io'
            label={'JUNGWILD'}
          />
        </h2>
        <p><Lang lnkey='sponsors.jungwild.intro'/></p>
        <p><Lang lnkey='sponsors.jungwild.sponsoring'/></p>
      </div>
    </div>
  </section>
</Layout>;
export default Index;
