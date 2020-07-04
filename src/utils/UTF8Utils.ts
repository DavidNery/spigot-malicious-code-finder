const byteArrayToUtf8 = (byte: any) => {
  return new Buffer(byte).toString("utf8");
}

export default byteArrayToUtf8;