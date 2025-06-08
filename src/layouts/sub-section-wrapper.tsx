import React from "react";

const SubSectionsWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="space-y-15  lg:space-y-16">{children}</div>;
};

export default SubSectionsWrapper;
