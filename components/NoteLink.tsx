import { FC } from "react";

const NoteLink: FC<{
    slug: string;
    className?: string;
    onClick?: () => void;
    children: any;
}> = ({ slug,children,className,onClick}) => {
    
    return <a
        onClick={(e) => {
            if (onClick) {
                e.preventDefault();
                onClick();
            }
        }}
        href={`/notes/${slug}`}
        className={className}>
        {children}
    </a>
}

export default NoteLink;