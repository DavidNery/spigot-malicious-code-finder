import JarChecker from "../services/JarChecker";
import { Instruction } from "java-class-tools";

export default abstract class BaseAnalyzer {
  protected _jarChecker: JarChecker;

  constructor(jarChecker: JarChecker) {
    this._jarChecker = jarChecker;
  }

  abstract analyze(methodInstructions: Instruction[], classFile: any): number;
}
