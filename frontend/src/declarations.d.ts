//解决无法引用png图片问题
declare module '*.png' {
    const value: string;
    export default value;
  }
  