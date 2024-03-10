import React, {useState} from 'react';
import {ProCard} from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';
import {useParams} from "react-router";
import {Button, message} from "antd";

const ProblemSet = () => {
  const [responsive, setResponsive] = useState(false);
  const params = useParams()

  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 596);
      }}
    >
      <ProCard
        title="左右分栏带标题"
        extra="2019年9月28日"
        split={responsive ? 'horizontal' : 'vertical'}
        bordered
        headerBordered
      >
        <ProCard title="左侧详情" colSpan="50%">
          <div style={{ height: 360 }}>左侧内容</div>
          <Button onClick={()=>{
            message.success(params)
          }}>click</Button>
        </ProCard>
        <ProCard title="流量占用情况">
          <div style={{ height: 360 }}>右侧内容</div>
        </ProCard>
      </ProCard>
    </RcResizeObserver>
  );
};

export default ProblemSet;
