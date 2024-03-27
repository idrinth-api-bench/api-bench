import React from 'react';
import Layout from '../../components/layout.tsx';

const License = () => <Layout Outlet={<div className='title-card'>
  <h1>MIT License</h1>
  <p>
    Copyright (c) Björn Büttner
  </p>
  <p>
    Permission is hereby granted, free of charge, to any person obtaining a
    copy of this software and associated documentation files
    (the &apos;Software&apos;)
    , to deal in the Software without restriction, including
    without limitation the rights to use, copy, modify, merge, publish,
    distribute, sublicense, and/or sell copies of the Software, and to
    permit persons to whom the Software is furnished to do so, subject to
    the following conditions:
  </p>
  <p>
    The above copyright notice and this permission notice shall be included
    in all copies or substantial portions of the Software.
  </p>
  <p>
    THE SOFTWARE IS PROVIDED &apos;AS IS&apos;,
    WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
    OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
    HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
    WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
    DEALINGS IN THE SOFTWARE.
  </p>
</div>}
path='/license'
page='license'
/>;
export default License;
