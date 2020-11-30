import { FC } from "react";
import { INote } from "../components/Note";
import { useSingleNote } from "../components/useNotes";
import NoteService from "../NoteService";

const SingleNote: FC<{
    note: INote;
    slug: string;
}> = (props) => {
    const { slug } = props;
    const note = useSingleNote({ slug, note:props.note });

    return (
        <div>
            <p>{slug}</p>
            <p>{note ? note.slug : 'Loading'}</p>
        </div>
    )

}
export async function getServerSideProps({ params }) {
    const { slug } = params;
    
    const notes = new NoteService();
    let note = notes.getNoteBySlug(slug);
      return {
        props: {
          note,
          slug,
      },
    }
  }

export default SingleNote;