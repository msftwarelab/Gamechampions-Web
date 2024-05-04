import React from "react";

import TextInput from "./form/textInput";
import TextArea from "./form/textArea";

import { FIELD_TYPES } from "./constants";

const DynamicFormField = ({
  item,
  register,
  watch,
  setValue,
  errors,
  isReadOnly
}) => {
  switch (item.componentType) {
    case FIELD_TYPES.TEXT_BOX:
      return (
        <TextInput
          register={register}
          watch={watch}
          errors={errors}
          setValue={setValue}
          name={item.name}
          fieldProps={item.fieldProps}
          validation={item.validation}
          readOnly={isReadOnly}
        />
      );
    case FIELD_TYPES.TEXT_AREA:
      return (
        <TextArea
          register={register}
          watch={watch}
          errors={errors}
          name={item.name}
          fieldProps={item.fieldProps}
          validation={item.validation}
          readOnly={isReadOnly}
        />
      );
  }
};

export default DynamicFormField;
