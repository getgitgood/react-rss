import { MouseEvent } from 'react';

type SubmitBtnProps = {
  str: string;
};
export default function SubmitBtn({ str }: SubmitBtnProps) {
  function submitHandler(e: MouseEvent) {
    e.preventDefault();
    console.log(str);
  }

  return (
    <>
      <button onClick={(e) => submitHandler(e)}>Submit</button>
    </>
  );
}
