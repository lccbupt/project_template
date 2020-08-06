import React, { useState } from 'react';
import { getCouponStatus } from '../../service/api';

const IndexPage = props => {
  useState(() => {
    getCouponStatus();
  })
  return (
    <p>this is a test</p>
  )
}

export default IndexPage;