function Error({ msg }: { msg: string }) {
  return (
    <div className="w-full h-full flex items-center justify-center">{msg}</div>
  );
}

export default Error;
