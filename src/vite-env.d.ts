/// <reference types="vite/client" />

declare module 'react-quill' {
  import { Component } from 'react';
  
  interface ReactQuillProps {
    value?: string;
    defaultValue?: string;
    placeholder?: string;
    readOnly?: boolean;
    theme?: string;
    modules?: any;
    formats?: string[];
    bounds?: string | HTMLElement;
    onChange?: (value: string) => void;
    onChangeSelection?: (range: any) => void;
    onFocus?: (range: any, source: string, editor: any) => void;
    onBlur?: (previousRange: any, source: string, editor: any) => void;
    onKeyPress?: (event: any) => void;
    onKeyDown?: (event: any) => void;
    onKeyUp?: (event: any) => void;
    style?: React.CSSProperties;
    className?: string;
  }
  
  export default class ReactQuill extends Component<ReactQuillProps> {}
}
