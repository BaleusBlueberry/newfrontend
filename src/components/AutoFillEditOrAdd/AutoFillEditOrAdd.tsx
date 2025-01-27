import { ErrorMessage, Field } from "formik";

interface FieldGroupProps {
  label: string;
  name: string;
  type?: string;
  as?: "input" | "select" | "checkbox";
  options?: string[]; // For select fields
  setFieldValue: (field: string, value: unknown) => void;
  parseValue?: (value: string) => unknown; // Optional custom parsing
}

const FieldGroup: React.FC<FieldGroupProps> = ({
  label,
  name,
  type = "text",
  as = "input",
  options,
  setFieldValue,
  parseValue,
}) => {
  return (
    <div className="mb-4 flex items-center w-full">
      <label htmlFor={name} className="block font-semibold w-32">
        {label}:
      </label>
      {as === "select" && options ? (
        <Field
          as="select"
          name={name}
          className="input w-full p-2 rounded-lg"
          onChange={(e) => setFieldValue(name, e.target.value)}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Field>
      ) : as === "checkbox" ? (
        <Field
          type="checkbox"
          name={name}
          className="input-checkbox"
          onChange={(e) => setFieldValue(name, e.target.checked)}
        />
      ) : (
        <Field
          type={type}
          name={name}
          className="input w-full p-2 rounded-lg"
          onChange={(e) =>
            setFieldValue(
              name,
              parseValue ? parseValue(e.target.value) : e.target.value
            )
          }
        />
      )}
      <ErrorMessage name={name} component="div" className="error-message" />
    </div>
  );
};

export default FieldGroup;
