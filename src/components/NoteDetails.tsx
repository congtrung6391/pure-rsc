import { Note } from "../types";

const NoteDetails = ({ data }: { data: Note }) => {
  return (
    <div>
      <p>{data.title}</p>
      <p>{data.content}</p>
    </div>
  )
};

export default NoteDetails;
