
const NoteLink = ({ slug,children,className}) => {
    return <a href={`/notes/${slug}`} className={className}>{children}</a>
}

export default NoteLink;