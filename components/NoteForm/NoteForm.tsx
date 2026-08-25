import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./NoteForm.module.css";
import { useId } from "react";
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
import { addNote } from "../../lib/api/api";
import toast from "react-hot-toast";
import * as Yup from "yup";

interface NoteFormProps {
  onClose: () => void;
}

function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: addNote,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["note"] });
      onClose();
    },
    onError(error) {
      toast(`Error adding note ${error}`);
    },
  });
  const fieldId = useId();

  interface NoteFormValues {
    title: string;
    content: string;
    tag: string;
  }

  const initialValues: NoteFormValues = {
    title: "",
    content: "",
    tag: "Personal",
  };

  const handleSubmit = async (
    values: NoteFormValues,
    actions: FormikHelpers<NoteFormValues>,
  ) => {
    try {
      mutate({ ...values });
      actions.resetForm();
    } catch (error) {
      toast(`Error adding note ${error}`);
    }
  };

  const NoteFormSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, "Title must be at least 3 characters")
      .max(50, "Title must be max 50 characters")
      .required("required"),
    content: Yup.string().max(500, "content must be max 500 characters"),
    tag: Yup.string()
      .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"], "Invalid tag")
      .required("required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={NoteFormSchema}
    >
      <Form className={css.form}>
        <fieldset>
          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-title`}>Title</label>
            <Field id="title" type="text" name="title" className={css.input} />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-content`}>Content</label>
            <Field
              id="content"
              name="content"
              as="textarea"
              rows={8}
              className={css.textarea}
            />

            <ErrorMessage
              name="content"
              component="span"
              className={css.error}
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-tag`}>Tag</label>
            <Field as="select" id="tag" name="tag" className={css.select}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>
        </fieldset>
        <fieldset>
          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className={css.submitButton} disabled={false}>
              Create note
            </button>
          </div>
        </fieldset>
      </Form>
    </Formik>
  );
}

export default NoteForm;
