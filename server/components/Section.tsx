import { FC } from "react";

 const Section: FC<{ heading: string; children: any, className?: string; id?: string }> = ({ heading, children, className, id }) => (
    <section className={className} id={id}>
      <h2>{heading}</h2>
      {children}
    </section>
);
  
export default Section;