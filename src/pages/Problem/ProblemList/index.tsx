import {getQuestionList} from '@/services/ant-design-pro/api';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {PageContainer, ProTable,} from '@ant-design/pro-components';
import {history, useIntl} from '@umijs/max';
import {message, Space, Tag} from 'antd';
import React, {useRef, useState} from 'react';

const TableList: React.FC = () => {
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [questionList, setQuestionList] = useState<API.QuestionVOBody[]>([])
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.QuestionVOBody>();
  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();
  const columns: ProColumns<API.QuestionVOBody>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '标题',
      dataIndex: 'title',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              message.success('点击成功！点击题目为：'+entity.title)
              history.push(`/problem/set/${entity.id}`)
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: '描述',
      dataIndex: 'content',
      valueType: 'textarea',
    },
    {
      title: '标签',
      dataIndex: 'tags',
      render: (_, record: API.QuestionVOBody) => (
        <Space>
          {
            //@ts-ignore
            record.tags.map((tag) => {
              return (
                <Tag key={tag} color="blue">
                  {tag}
                </Tag>
              );
            })

          }
        </Space>
      ),
    },
    //展示submitNum和acceptedNum
    {
      title: '提交数',
      dataIndex: 'submitNum',
      valueType: 'textarea',
      hideInSearch: true,

    },
    {
      title: '采纳数',
      dataIndex: 'acceptedNum',
      valueType: 'textarea',
      hideInSearch: true,

    },

    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'date',
      hideInSearch: true,

    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      valueType: 'date',
      hideInSearch: true,

    },
  ];

  return (
    <PageContainer>
      <ProTable<API.QuestionVOBody>
        columns={columns}
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.title',
          defaultMessage: 'Enquiry form',
        })}
        pagination={{
          pageSize: 5,
          onChange: (page) => console.log(page),
        }}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        //@ts-ignore
        request={async (params: API.QuestionListParams)=>getQuestionList(params)}
      />
    </PageContainer>
  );
};

export default TableList;
