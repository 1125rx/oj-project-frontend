declare namespace API {
  type CurrentUser = {
    userName?: string;
    userAccount?: string;
    userAvatar?: string;
    id?: string;
    userProfile?: string;
    createTime?: Date;
    userRole?: string;
    updateTime?: Date;


  };
  type JudgeCaseBody = {
    input?: string;
    output?: string;
  }

  type AnswerBody = {
    language?: string;
    code?: string;
  }

  type QuestionBody = {
    id?: number;
    title?: string;
    tags?: string;
    content?: string;
    answer?: string;
    submitNum?: number;
    acceptedNum?: number;
    judgeCase?: string;
    judgeConfig?: string;
    thumbNum?: number;
    favourNum?: number;
    userId?: number;
    createTime?: Date;
    updateTime?: Date;
  }
  type QuestionListParams = {
    id?: number;
    title?: string;
    tags?: string;
    content?: string;
    userId?: number;
  }

  type JudgeConfig = {
    timeLimit?: number;
    memoryLimit?: number;
    stackLimit?: number;
  }

  type QuestionVOBody = {
    id?: number;
    title?: string;
    content?: string;
    tags?: string[];
    sample?: JudgeCaseBody;
    submitNum?: number;
    acceptedNum?: number;
    judgeConfig?: JudgeConfig;
    thumbNum?: number;
    favourNum?: number;
    userId?: number;
    createTime?: Date;
    updateTime?: Date;
  }

  type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
  };

  type BaseResponse<T> = {
    code: number,
    data: T,
    message: string,
  }

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };
  type QuestionList = {
    data?: QuestionVOBody[];
    /** 列表的内容总数 */
    total?: number;

  }
  type QuestionQueryParams = {
    id?: number;
    title?: string;
    content?: string;
    tags?: string[];
    answer?: string;
    userId?: number;
    pageSize?: number;
    current?: number;
    sortField?: string;
  }

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type RegisterParams = {
    userAccount?: string;
    userPassword?: string;
    checkPassword?: boolean;
  };


  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
