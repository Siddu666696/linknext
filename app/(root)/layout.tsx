import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <div>layout</div>
      {children}
    </>
  );
};

export default layout;
