import {Footer} from '@/components';
import {register} from '@/services/ant-design-pro/api';
import {
  AlipayCircleOutlined,
  LockOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import {LoginForm, ProFormText,} from '@ant-design/pro-components';
import {Helmet, history, SelectLang, useIntl, useModel} from '@umijs/max';
import {Alert, Button, message, Tabs} from 'antd';
import Settings from '../../../../config/defaultSettings';
import React, {useState} from 'react';
import {flushSync} from 'react-dom';
import {createStyles} from 'antd-style';

const useStyles = createStyles(({token}) => {
  return {
    action: {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    },
    lang: {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
    container: {
      // display: 'flex',
      // flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      background: 'linear-gradient(-45deg, #23a6d5, #1abc9c, #23a6d5, #23d5ab)',
      // backgroundImage:
      //   'background.jpg',
      // "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '400% 400%',
      animation: 'gradient 15s ease infinite',
      '@keyframes gradient': {
        '0%': {
          backgroundPosition: '0% 50%',
        },
        '50%': {
          backgroundPosition: '100% 50%',
        },
        '100%': {
          backgroundPosition: '0% 50%',
        },
      },
    },
  };
});

const ActionIcons = () => {
  const {styles} = useStyles();

  return (
    <>
      <AlipayCircleOutlined key="AlipayCircleOutlined" className={styles.action}/>
      <TaobaoCircleOutlined key="TaobaoCircleOutlined" className={styles.action}/>
      <WeiboCircleOutlined key="WeiboCircleOutlined" className={styles.action}/>
    </>
  );
};

const Lang = () => {
  const {styles} = useStyles();

  return (
    <div className={styles.lang} data-lang>
      {SelectLang && <SelectLang/>}
    </div>
  );
};

const LoginMessage: React.FC<{
  content: string;
}> = ({content}) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};

const Register: React.FC = () => {
  // @ts-ignore
  const [registerState, setRegisterState] = useState<API.BaseResponse<number>>({});
  const [type, setType] = useState<string>('account');
  const {initialState, setInitialState} = useModel('@@initialState');
  const {styles} = useStyles();
  const intl = useIntl();

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };
  const handleRegister = async (values: API.RegisterParams) => {
    try {
      // 注册
      const msg: API.BaseResponse<number> = await register({...values});
      if (msg.message === 'ok') {
        const defaultRegisterSuccessMessage = '注册成功！请重新登陆';
        message.success(defaultRegisterSuccessMessage);
        await fetchUserInfo();
        history.push('/user/login');
        console.log("请求结果如下：")
        console.log(msg.data);
        return;
      }
      console.log(msg);
      // 如果失败去设置用户错误信息
      setRegisterState(msg);
    } catch (error) {
      const defaultRegisterFailureMessage = '注册失败，请重试！错误信息为' + registerState.message;
      console.log(error);
      message.error(defaultRegisterFailureMessage);
    }
  };

  return (
    <div className={styles.container}>
      <Helmet>
        <title>
          {intl.formatMessage({
            id: 'menu.register',
            defaultMessage: '注册页',
          })}
          - {Settings.title}
        </title>
      </Helmet>
      <Lang/>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/code-icon.png"/>}
          title="ZOJ"
          subTitle={intl.formatMessage({id: 'pages.layouts.userLayout.title'})}
          submitter={{
            searchConfig: {
              submitText: '注册'
            }
          }}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleRegister(values as API.RegisterParams);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: '新用户注册',
              },
            ]}
          />

          {registerState.code !== 0 && registerState.message !== undefined && (
            <LoginMessage
              content={'注册失败，原因为：' + registerState.message}
            />
          )}
          <ProFormText
            name="userAccount"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined/>,
            }}
            placeholder={'请输入注册账号'}
            rules={[
              {
                required: true,
                message: '账号为必填项！'
              },
              {
                min: 6,
                message: '账号最少为6位',
              },
            ]}
          />
          <ProFormText.Password
            name="userPassword"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined/>,
            }}
            placeholder='请设置密码'
            rules={[
              {
                required: true,
                message: '请设置密码',
              },
            ]}
          />
          <ProFormText.Password
            name="checkPassword"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined/>,
            }}
            placeholder='请再次输入密码'
            rules={[
              {
                required: true,
                message: '请再次设置密码'
              }
            ]}
          />
          <div
            style={{
              marginBottom: 24,
              textAlign: 'center',
            }}
          >

            {/* 设置该按钮大小为328px * 40px */}
            <Button
              type="primary"
              size={"large"}
              // 设置点击事件为返回登陆页面
              onClick={() => {
                history.push('/user/login');
              }}
              style={{width: '328px', height: '40px'}}>
              返回登陆界面
            </Button>
          </div>
        </LoginForm>
      </div>
      <Footer/>
    </div>
  );
};

export default Register;
