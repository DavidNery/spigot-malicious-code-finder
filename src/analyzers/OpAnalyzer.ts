import {
  Opcode,
  Instruction,
} from "java-class-tools";

import BaseAnalyzer from "./BaseAnalyzer";
import { getInvokedMethodInfo } from "../utils/MethodUtils";

export default class OpAnalyzer extends BaseAnalyzer {
  /**
   * For now, we only detect forceOp directly:
   *  CommandSender#setOp
   *  CraftCommandSender#setOp
   *  Player#setOp
   *  CraftPlayer#setOp
   *  DedicatedPlayerList#addOp
   *
   * @param jar the plugin to be analyzed
   */
  analyze(
    methodInstructions: Instruction[],
    classFile: any,
  ): number {
    let amount = 0;

    methodInstructions.forEach((instruction) => {
      const { opcode, operands } = instruction;

      if (
        opcode === Opcode.INVOKEVIRTUAL ||
        opcode === Opcode.INVOKEINTERFACE
      ) {
        // https://en.wikipedia.org/wiki/Java_bytecode_instruction_listings
        const constantPool: any =
          classFile.constant_pool[(operands[0] << 8) | operands[1]];

        const methodInfo = getInvokedMethodInfo(classFile, constantPool);

        const owner = methodInfo.owner;
        // Yes, I could have used regex to check NMS and CB classes,
        // but I was tired
        if (methodInfo.name === "setOp") {
          if (
            owner === "org/bukkit/command/CommandSender" ||
            owner === "org/bukkit/entity/Player" ||
            (owner.startsWith("org/bukkit/craftbukkit/") &&
              owner.endsWith("entity/CraftPlayer"))
          )
            amount++;
        } else if (methodInfo.name === "addOp") {
          if (
            owner.startsWith("net/minecraft/server/") &&
            owner.endsWith("DedicatedPlayerList")
          )
            amount++;
        }
      }
    });
    
    return amount;
  }
}
