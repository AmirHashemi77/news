# Buttons

```tsx
import { Button, ButtonLink } from "@/shared/ui/button";

<Button type="submit" isLoading={isSubmitting} loadingText="در حال ارسال...">
  ارسال
</Button>

<Button variant="ghost" size="icon" aria-label="بستن" onClick={onClose}>
  <FiX aria-hidden="true" />
</Button>

<ButtonLink href="/login" variant="outline">ورود</ButtonLink>
```

- `variant`: `primary` (default), `secondary`, `outline`, `ghost`, `danger`, `overlay`, `unstyled`.
- `size`: `sm`, `md` (default), `lg`, `icon-sm`, `icon`, `icon-lg`, `none`.
- `fullWidth`: fills the available width. Responsive `className` overrides are supported.
- `isLoading`: disables the button, sets `aria-busy`, and shows a spinner. `loadingText` optionally replaces its content; otherwise the existing content stays visible.
- `Button` defaults to `type="button"`. Set `type="submit"` explicitly for form submission.
- Native button attributes, event handlers, ARIA attributes, and React 19 `ref` are forwarded.
- `ButtonLink` renders a Next.js link and accepts its normal navigation props. Use it for navigation; loading and disabled states belong to `Button`.
- Icon-only buttons need an `aria-label`. Use `aria-pressed` for toggle buttons.
- `unstyled` with `size="none"` is reserved for controls such as fullscreen dismiss backdrops.
- `buttonStyles` is available for native anchors that need the same appearance.

These components can be used in Server and Client Components. Event handlers and client state must be provided from a Client Component.

Run the component checks with `node --import tsx --test src/shared/ui/button/Button.test.tsx`.
