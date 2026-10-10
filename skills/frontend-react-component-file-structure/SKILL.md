---
name: frontend-react-component-file-structure
description: Guideline for React component file's structure
---

```ts
import { FC } from 'react';

// Define props in an interface.
export interface FooProps {}

// Components should be declared using FC
const Foo: FC<FooProps> = () => {
  return <div></div>;
};

// Always set displayName. This makes debugging easier.
Foo.displayName = 'Foo';

// Use a default export.
export default Foo;
```

- Put at most one component in each component file.
