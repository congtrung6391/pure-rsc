"use server";

console.log("action render from server");

async function createNoteAction (values: unknown) {
  console.log(values);
};

export default createNoteAction;
