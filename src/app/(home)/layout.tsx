interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <main className="flex flex-col min-h-screen max-h-screen">
<div
  className="absolute inset-0 -z-10 h-full w-full 
    bg-background 
    dark:bg-[radial-gradient(#ffffff20_1px,transparent_1px)] 
    bg-[radial-gradient(#dadde2_1px,transparent_1px)] 
    [background-size:16px_16px] 
    [mask-image:linear-gradient(to_bottom,black_0%,black_50%,transparent_100%)] 
    [mask-mode:match-source]"
/>


      <div className="flex-1 flex flex-col px-4 pb-4">{children}</div>
    </main>
  );
};

export default Layout;
