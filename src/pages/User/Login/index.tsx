import {Footer} from '@/components';
import {login} from '@/services/ant-design-pro/api';
import {getFakeCaptcha} from '@/services/ant-design-pro/login';
import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import {FormattedMessage, history, SelectLang, useIntl, useModel, Helmet, Link} from '@umijs/max';
import {Alert, message, Tabs} from 'antd';
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
    body: {
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

const Login: React.FC = () => {
  // @ts-ignore
  const [userLoginState, setUserLoginState] = useState<API.BaseResponse<API.CurrentUser>>({});
  const [type, setType] = useState<string>('account');
  const {initialState, setInitialState} = useModel('@@initialState');
  const {styles} = useStyles();
  const intl = useIntl();

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        // @ts-ignore
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const msg = await login({...values, type});
      if (msg.message === 'ok') {
        const defaultLoginSuccessMessage = '登陆成功！'
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        return;
      }
      console.log(msg);
      // 如果失败去设置用户错误信息
      setUserLoginState(msg);
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: '登录失败，请重试！',
      });
      console.log(error);
      message.error(defaultLoginFailureMessage);
    }
  };

  return (
    <div className={styles.body}>
      <Helmet>
        <title>
          {intl.formatMessage({
            id: 'menu.login',
            defaultMessage: '登录页',
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
          initialValues={{
            autoLogin: true,
          }}
          actions={[
            <FormattedMessage
              key="loginWith"
              id="pages.login.loginWith"
              defaultMessage="其他登录方式"
            />,
            // <ActionIcons key="icons"/>,
          ]}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'userAccount',
                label: intl.formatMessage({
                  id: 'pages.login.accountLogin.tab',
                  defaultMessage: '账户密码登录',
                }),
              },
              // {
              //   key: 'mobile',
              //   label: intl.formatMessage({
              //     id: 'pages.login.phoneLogin.tab',
              //     defaultMessage: '手机号登录',
              //   }),
              // },
            ]}
          />

          {userLoginState.message !== 'ok' && userLoginState.message !== undefined && (
            <LoginMessage
              content={'登陆失败，原因为：' + userLoginState.message}
            />
          )}
          <ProFormText
            name="userAccount"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined/>,
            }}
            rules={[
              {
                required: true,
                message: '账号是必填项！',
              },
              {
                min: 4,
                message: '账号最少为4位',
              }
            ]}
          />
          <ProFormText.Password
            name="userPassword"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined/>,
            }}
            rules={[
              {
                required: true,
                message: '密码是必填项'
              },
            ]}
          />

          {/*{status === 'error' && loginType === 'mobile' && <LoginMessage content="验证码错误"/>}*/}
          {/*{type === 'mobile' && (*/}
          {/*  <>*/}
          {/*    <ProFormText*/}
          {/*      fieldProps={{*/}
          {/*        size: 'large',*/}
          {/*        prefix: <MobileOutlined/>,*/}
          {/*      }}*/}
          {/*      name="mobile"*/}
          {/*      placeholder={intl.formatMessage({*/}
          {/*        id: 'pages.login.phoneNumber.placeholder',*/}
          {/*        defaultMessage: '手机号',*/}
          {/*      })}*/}
          {/*      rules={[*/}
          {/*        {*/}
          {/*          required: true,*/}
          {/*          message: (*/}
          {/*            <FormattedMessage*/}
          {/*              id="pages.login.phoneNumber.required"*/}
          {/*              defaultMessage="请输入手机号！"*/}
          {/*            />*/}
          {/*          ),*/}
          {/*        },*/}
          {/*        {*/}
          {/*          pattern: /^1\d{10}$/,*/}
          {/*          message: (*/}
          {/*            <FormattedMessage*/}
          {/*              id="pages.login.phoneNumber.invalid"*/}
          {/*              defaultMessage="手机号格式错误！"*/}
          {/*            />*/}
          {/*          ),*/}
          {/*        },*/}
          {/*      ]}*/}
          {/*    />*/}
          {/*    <ProFormCaptcha*/}
          {/*      fieldProps={{*/}
          {/*        size: 'large',*/}
          {/*        prefix: <LockOutlined/>,*/}
          {/*      }}*/}
          {/*      captchaProps={{*/}
          {/*        size: 'large',*/}
          {/*      }}*/}
          {/*      placeholder={intl.formatMessage({*/}
          {/*        id: 'pages.login.captcha.placeholder',*/}
          {/*        defaultMessage: '请输入验证码',*/}
          {/*      })}*/}
          {/*      captchaTextRender={(timing, count) => {*/}
          {/*        if (timing) {*/}
          {/*          return `${count} ${intl.formatMessage({*/}
          {/*            id: 'pages.getCaptchaSecondText',*/}
          {/*            defaultMessage: '获取验证码',*/}
          {/*          })}`;*/}
          {/*        }*/}
          {/*        return intl.formatMessage({*/}
          {/*          id: 'pages.login.phoneLogin.getVerificationCode',*/}
          {/*          defaultMessage: '获取验证码',*/}
          {/*        });*/}
          {/*      }}*/}
          {/*      name="captcha"*/}
          {/*      rules={[*/}
          {/*        {*/}
          {/*          required: true,*/}
          {/*          message: (*/}
          {/*            <FormattedMessage*/}
          {/*              id="pages.login.captcha.required"*/}
          {/*              defaultMessage="请输入验证码！"*/}
          {/*            />*/}
          {/*          ),*/}
          {/*        },*/}
          {/*      ]}*/}
          {/*      onGetCaptcha={async (phone) => {*/}
          {/*        const result = await getFakeCaptcha({*/}
          {/*          phone,*/}
          {/*        });*/}
          {/*        if (!result) {*/}
          {/*          return;*/}
          {/*        }*/}
          {/*        message.success('获取验证码成功！验证码为：1234');*/}
          {/*      }}*/}
          {/*    />*/}
          {/*  </>*/}
          {/*)}*/}
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              <FormattedMessage id="pages.login.rememberMe" defaultMessage="自动登录"/>
            </ProFormCheckbox>
            <Link style={{float: 'right'}} to="/user/register">新用户注册</Link>
            <a
              style={{
                float: 'right',
              }}
            >
              <FormattedMessage id="pages.login.forgotPassword" defaultMessage="忘记密码"/>
            </a>
          </div>
        </LoginForm>
      </div>
      <Footer/>
    </div>
  );
};

export default Login;
