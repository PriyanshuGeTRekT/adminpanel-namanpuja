import { TextInput, type TextInputProps } from 'react-admin';

/**
 * Edits a JSON column (object or array) as pretty-printed text.
 * Parses back to JSON on save; shows a validation error on malformed input.
 */
export function JsonInput(props: TextInputProps) {
  return (
    <TextInput
      {...props}
      multiline
      fullWidth
      minRows={4}
      format={(value) => {
        if (value === null || value === undefined || value === '') return '';
        if (typeof value === 'string') return value;
        try {
          return JSON.stringify(value, null, 2);
        } catch {
          return String(value);
        }
      }}
      parse={(value: string) => {
        if (!value || !value.trim()) return null;
        try {
          return JSON.parse(value);
        } catch {
          // keep raw string so the validator can flag it
          return value;
        }
      }}
      validate={(value) => {
        if (value === null || value === undefined || value === '') return undefined;
        if (typeof value === 'object') return undefined;
        return 'Must be valid JSON';
      }}
      helperText="Enter valid JSON (array or object)."
    />
  );
}
