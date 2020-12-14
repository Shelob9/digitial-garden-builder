import { FC } from "react";


const NoteLink: FC<{
    slug: string;
    className?: string;
    onClick?: () => void;
    href?: string;
    children: any;
}> = ({ href,slug,children,className,onClick}) => {
    
    return <a
        onClick={(e) => {
            if (onClick) {
                e.preventDefault();
                onClick();
            }
        }}
        href={href ??`/notes/${slug}`}
        className={className}>
        {children}
    </a>
}

export default NoteLink;