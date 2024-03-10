import Editor from '@monaco-editor/react';
import {ProCard} from "@ant-design/pro-components";
import {Button, message, Select, Space} from "antd";
import {CheckOutlined, RedoOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import { set } from 'lodash';

const GraphEditor = () => {
  const [editorValue, setEditorValue] = useState('public class Main {\n\tpublic static void main(String[] args) {\n\t\t// \n\t}\n}');
  const [language,setLanguage] = useState('cpp')
  const [defaultValue, setDefaultValue] = useState<string>("public class Main {\n\tpublic static void main(String[] args) {\n\t\t// \n\t}\n}");

  const handleEditorChange = (newValue:string) => {
    setEditorValue(newValue);
  };
  const handleSelectChange = (newLanguage: string) =>{
    setLanguage(newLanguage)
    // @ts-ignore
    setEditorValue(initialCodes[newLanguage])
  }
  //写一个map，将language映射成对应语言的初始代码
  const initialCodes = {
    java: "public class Main {\n\tpublic static void main(String[] args) {\n\t\t// Java 初始代码\n\t}\n}",
    cpp: "#include <iostream>\nusing namespace std;\n\nint main() {\n\t// C++ 初始代码\n\treturn 0;\n}",
    python: "if __name__ == '__main__':\n\t# Python 初始代码",
  };

  const handleGetValue = () => {
    console.log(editorValue);
  };
  // @ts-ignore
  return (
    <div>
      <Space>
        <Select
          defaultValue="java"
          style={{ width: 120 }}
          onChange={handleSelectChange}
          options={[
            { value: 'java', label: 'Java' },
            { value: 'cpp', label: 'C++' },
            { value: 'python', label: 'Python' },
          ]}
        />
      </Space>
      <ProCard title={"代码区"} hoverable bordered>
        <Editor
          language={language}
          width="100%"
          value={editorValue}
          height={600}
          defaultValue={defaultValue}
          // @ts-ignore
          onChange={handleEditorChange}
          options={{
            theme: 'vs', // 编辑器主题颜色
            folding: true, // 是否折叠
            foldingHighlight: true, // 折叠等高线
            foldingStrategy: 'indentation', // 折叠方式  auto | indentation
            showFoldingControls: 'always', // 是否一直显示折叠 always | mouseover
            disableLayerHinting: true, // 等宽优化
            emptySelectionClipboard: false, // 空选择剪切板
            selectionClipboard: false, // 选择剪切板
            automaticLayout: true, // 自动布局
            codeLens: false, // 代码镜头
            scrollBeyondLastLine: false, // 滚动完最后一行后再滚动一屏幕
            colorDecorators: true, // 颜色装饰器
            accessibilitySupport: 'off', // 辅助功能支持  "auto" | "off" | "on"
            lineNumbers: 'on', // 行号 取值： "on" | "off" | "relative" | "interval" | function
            lineNumbersMinChars: 5, // 行号最小字符   number
            readOnly: false, //是否只读  取值 true | false
          }}
        />
        <Space>
          <Button type="primary" icon={<CheckOutlined/>}>提交</Button>
          <Button onClick={
            () => {
              message.success(editorValue)
            }
          }
                  icon={<RedoOutlined/>}
          >重置</Button>
        </Space>
      </ProCard>
    </div>
  );
};
export default GraphEditor;
