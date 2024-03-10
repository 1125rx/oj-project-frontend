import React, {useEffect, useState} from 'react';
import {ProCard, ProDescriptions} from '@ant-design/pro-components';
import {useParams} from "react-router";
import {Avatar, message, Space, Tag} from "antd";
import {getQuestionVObyId} from "@/services/ant-design-pro/api";
import GraphEditor from "@/pages/Problem/ProblemSet/components/GraphEditor";

const ProblemSet = () => {
  const [responsive, setResponsive] = useState(false);
  const [codeValue,setCodeValue] = useState<string>();
  const {id} = useParams()
  const [problemSet, setProblemSet] = useState<API.QuestionVOBody>({})
  useEffect(() => {
    async function runEffect() {
      const request: API.GetQuestionBYId = {
        id: id
      }
      const res = await getQuestionVObyId(request)
      if (res.code === 0 && res.data) {
        setProblemSet(res.data)
        message.success("获取信息成功！")
      } else
        message.error("获取信息失败," + res.message)
    }

    runEffect()
  }, []);

  return (
    <ProCard
      split={responsive ? 'horizontal' : 'vertical'}
      bordered
      headerBordered
    >
      <ProCard title="题目详情" colSpan="50%" >
        <ProDescriptions
          size={"middle"}
          column={1}
          title={problemSet.title}
        >
          <ProDescriptions.Item
            label="题目要求"
            valueType="text"
          >
            {problemSet.content}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="标签">
            <Space>
              {
                //tags是一个字符串数组，需要转换成标签数组，外部用<Space>包裹
                problemSet.tags?.map((tag, index) => {
                  return <Tag key={index} color="blue">{tag}</Tag>
                })
              }
            </Space>
          </ProDescriptions.Item>
          {/*<ProDescriptions.Item*/}
          {/*  label="选择框"*/}
          {/*  valueEnum={{*/}
          {/*    all: { text: '全部', status: 'Default' },*/}
          {/*    open: {*/}
          {/*      text: '未解决',*/}
          {/*      status: 'Error',*/}
          {/*    },*/}
          {/*    closed: {*/}
          {/*      text: '已解决',*/}
          {/*      status: 'Success',*/}
          {/*    },*/}
          {/*    processing: {*/}
          {/*      text: '解决中',*/}
          {/*      status: 'Processing',*/}
          {/*    },*/}
          {/*  }}*/}
          {/*>*/}
          {/*  open*/}
          {/*</ProDescriptions.Item>*/}
          {/*<ProDescriptions.Item*/}
          {/*  label="远程选择框"*/}
          {/*  request={async () => [*/}
          {/*    { label: '全部', value: 'all' },*/}
          {/*    { label: '未解决', value: 'open' },*/}
          {/*    { label: '已解决', value: 'closed' },*/}
          {/*    { label: '解决中', value: 'processing' },*/}
          {/*  ]}*/}
          {/*>*/}
          {/*  closed*/}
          {/*</ProDescriptions.Item>*/}
          <ProDescriptions.Item label="测试用例" valueType="jsonCode">
            {JSON.stringify(problemSet.sample)}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="限制" valueType="jsonCode">
            {JSON.stringify(problemSet.judgeConfig)}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label="创建人"
          >
            <Space>
              <Avatar src={problemSet.userVO?.userAvatar}/>
              <h3>{problemSet.userVO?.userName}</h3>
            </Space>
          </ProDescriptions.Item>
          <ProDescriptions.Item label="创建日期" valueType="date">
            {/*@ts-ignore*/}
            {problemSet.createTime}
          </ProDescriptions.Item>
        </ProDescriptions>
      </ProCard>
      <ProCard>
        <GraphEditor/>
      </ProCard>
    </ProCard>
  );
};

export default ProblemSet;
