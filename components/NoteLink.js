
const NoteLink = ({ slug,text,className}) => {
    return <a href={`/notes/${slug}`} className={className}>{text}</a>
}

export default NoteLink;