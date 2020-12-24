# Refactor Steps

1. Create a macro using [babel-plugin-macros](https://github.com/kentcdodds/babel-plugin-macros) to convert functions to an object containing:

```
{
  entryPoint: instrumented algorithm
  params: list of function parameters
}
```

2. Update the `makeAlgorithmPage` util to use this macro for the selected algorithm
3. Somehow make all of this work with typescript
