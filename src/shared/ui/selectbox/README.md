# SelectBox

A single-select field styled to match the project's text inputs. It uses a native select, preserving keyboard navigation, browser form submission, and mobile selection interfaces. The open options picker follows the browser and operating system.

```tsx
import { SelectBox } from "@/shared/ui/selectbox";

<SelectBox
  label="جنسیت"
  placeholder="انتخاب جنسیت"
  options={[
    { value: "MALE", label: "مرد" },
    { value: "FEMALE", label: "زن" },
  ]}
  error={errors.gender?.message}
  {...register("gender")}
/>
```

- `options`: string values and labels, with optional `disabled` on each choice. Reserve an empty value for the placeholder.
- `placeholder`: initially selected, disabled option for a field without a value.
- `label`, `hint`, `error`: automatically linked to the field for accessibility. An error also sets `aria-invalid`.
- `startIcon`: decorative icon placed at the start of the field.
- `size`: `sm`, `md` (default), or `lg`.
- `dir`: `rtl` (default) or `ltr`. Icon positions follow the direction.
- `className`: overrides the select's styles; `containerClassName` styles its outer container.
- `value` / `onChange`: controlled selection; `defaultValue`: uncontrolled initial selection.
- Native attributes, events, and React 19 `ref` pass through to the select, including refs from React Hook Form's `register`.

Use a unique `id` when rendering several fields with the same `name`. An ID is generated automatically when neither `id` nor `name` is provided.

Run the checks with `node --import tsx --test src/shared/ui/selectbox/SelectBox.test.tsx`.
