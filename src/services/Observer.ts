export interface ObserverData {
  jarReadStart: { jarName: string };
  jarReadFinish: { jarName: string };
  classReadStart: { className: string };
  classReadFinish: { className: string };
  methodResult: {
    className: string;
    methodName: string;
    analyzers: { forceop: number };
  };
}

export type ObserverTypes = keyof ObserverData;

export default interface Observer<O extends ObserverTypes> {
  type: keyof O;

  do(result: O): void;
}
