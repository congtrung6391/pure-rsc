import { readFile } from "fs";
import path from "path";

console.log('RSC logger');

type FileNote = {
  id: string;
  name: string;
  content: string;
}

const ListNode = async () => {
  console.log('render list note');
  const data = await new Promise<string>(resolve => {
    readFile(
      path.resolve(__dirname, '../data.json'),
      'utf8',
      (err, data) => {
        console.log(data, err);
        resolve(data || err?.message || '');
      }
    )
  });

  const files = JSON.parse(data);

  return (
    <div>
      <h3>List of notes</h3>

      {files.map((file: FileNote) => (
        <div key={file.id}>
          <p>{file.name}</p>
        </div>
      ))}
    </div>
  )
};

export default ListNode;
