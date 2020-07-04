import JSZip from "jszip";
import Observer, { ObserverTypes, ObserverData } from "./Observer";
import {
  JavaClassFileReader,
  Modifier,
  InstructionParser,
} from "java-class-tools";
import { getMethodInfo } from "../utils/MethodUtils";
import OpAnalyzer from "../analyzers/OpAnalyzer";

export default class JarChecker {
  private _observers: Observer<any>[];
  private _jarFile: File;
  private _classReader: JavaClassFileReader;

  constructor(jarFile: File) {
    this._jarFile = jarFile;
    this._classReader = new JavaClassFileReader();

    this._observers = [];
  }

  subscribe<O extends ObserverTypes, D extends ObserverData[O]>(
    type: O,
    doFunction: (result: D) => void
  ): void {
    this._observers.push({
      type,
      do: doFunction,
    });
  }

  emit<O extends ObserverTypes, D extends ObserverData[O]>(
    type: O,
    data: D
  ): void {
    this._observers.forEach((observer) => {
      if (observer.type === type) observer.do(data);
    });
  }

  analyzeJar(): void {
    this.emit("jarReadStart", { jarName: this._jarFile.name });
    JSZip.loadAsync(this._jarFile).then((jar) => {
      const classes = jar.filter((file) => file.endsWith(".class"));

      let i = 0;

      const proccesNext = () => {
        const currentClass = classes[i++];

        if (currentClass) {
          this.emit("classReadStart", {
            className: currentClass.name,
          });
          currentClass.async("uint8array").then((buffer) => {
            const classFile = this._classReader.read(buffer);

            const opAnalyzer = new OpAnalyzer(this);
            classFile.methods.forEach((method) => {
              if ((method.access_flags & Modifier.ABSTRACT) === 0) {
                const methodInfo = getMethodInfo(classFile, method);
                const bytecode = methodInfo?.code;

                if (methodInfo && bytecode) {
                  const methodDetails: ObserverData["methodResult"] = {
                    className: currentClass.name,
                    methodName: methodInfo.name,
                    analyzers: {
                      forceop: 0,
                    },
                  };

                  const methodInstructions = InstructionParser.fromBytecode(
                    bytecode.code
                  );

                  methodDetails.analyzers.forceop = opAnalyzer.analyze(
                    methodInstructions,
                    classFile
                  );

                  this.emit("methodResult", methodDetails);
                }
              }
            });

            this.emit("classReadFinish", {
              className: currentClass.name,
            });

            proccesNext();
          });
        } else {
          this.emit("jarReadFinish", { jarName: this._jarFile.name });
        }
      };

      proccesNext();
    });
  }
}
