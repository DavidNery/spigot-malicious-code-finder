import byteArrayToUtf8 from "./UTF8Utils";

export const getMethodName = (classFile: any, method: any) => {
  return byteArrayToUtf8(
    classFile.constant_pool[method.name_index].bytes
  );
}

export const getMethodInfo = (classFile: any, method: any) => {
  const methodAttributes = method.attributes;

  if (methodAttributes) {
    const code = methodAttributes.filter((attr: any) => {
      const nameBytes =
        classFile.constant_pool[attr.attribute_name_index].bytes;
      return new Buffer(nameBytes).toString("utf8") === "Code";
    })[0];

    const name = getMethodName(classFile, method);

    return { code, name };
  } else return undefined;
}

export const getInvokedMethodInfo = (classFile: any, constantPool: any) => {
  const invokedMethod =
    classFile.constant_pool[constantPool.name_and_type_index];
  const methodOwner = classFile.constant_pool[constantPool.class_index];

  const name = getMethodName(classFile, invokedMethod);
  const owner = byteArrayToUtf8(
    classFile.constant_pool[methodOwner.name_index].bytes
  );

  return {
    name,
    owner,
  };
}