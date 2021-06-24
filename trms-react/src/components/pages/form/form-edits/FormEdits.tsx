import React, { Dispatch, SetStateAction } from "react";
import Form from "../../../../models/form";

type Props = {
  currentForm: Form | undefined;
  setCurrentForm: Dispatch<SetStateAction<Form | undefined>>,
}

const FormEdits: React.FC<Props> = ({currentForm, setCurrentForm}) => {
  return (
    <>

    </>
  );
}

export default FormEdits;