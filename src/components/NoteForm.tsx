import createNoteAction from "./createNodeAction";


const NoteForm = async () => {
  console.log("Note form render here");

  return (
    <div>
      {/* @ts-ignore */}
      <form action={createNoteAction}>
        <input id="name" name="name" />
        <input id="content" name="content" />
        <button type="submit">submit</button>
      </form>
    </div>
  )
};

export default NoteForm;
