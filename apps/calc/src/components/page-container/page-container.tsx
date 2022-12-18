import React from "react";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageContainer({
  children,
  className,
}: PageContainerProps) {
  return (
    <div className={`${className} py-14 px-[20%] overflow-hidden`}>
      {children}
    </div>
  );
}
