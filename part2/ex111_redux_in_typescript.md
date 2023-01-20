

### 설치
터미널> npm install @types/react-redux 

### configureStore
- Using configureStore should not need any additional typings.
- It's safe to export them directly from your store setup file such as app/store.ts and import them directly into other files.


### usage in app
```
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
```

